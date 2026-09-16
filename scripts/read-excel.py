#!/usr/bin/env python3
"""Read school Excel files and output JSON for database import."""
import openpyxl
import json
import os
import sys

UPLOAD = "/home/z/my-project/upload"

def read_teachers():
    """Read daftar-guru + daftar-tendik and return teacher list."""
    teachers = []
    # Male/female photo pools (cycle through)
    male_photos = ["/uploads/teachers/teacher-3.png", "/uploads/teachers/teacher-1.png", "/uploads/teachers/teacher-5.png"]
    female_photos = ["/uploads/teachers/teacher-4.png", "/uploads/teachers/teacher-2.png", "/uploads/teachers/teacher-6.png", "/uploads/teachers/headmaster.png"]
    male_idx = [0]
    female_idx = [0]

    def next_photo(gender):
        if gender == "L":
            p = male_photos[male_idx[0] % len(male_photos)]
            male_idx[0] += 1
            return p
        else:
            p = female_photos[female_idx[0] % len(female_photos)]
            female_idx[0] += 1
            return p

    # Class assignment for the 6 regular teachers (round-robin 1-6)
    class_assignments = ["Guru Kelas 1", "Guru Kelas 5", "Guru Kelas 6", "Guru Kelas 4", "Guru Kelas 3", "Guru Kelas 2"]
    class_idx = [0]

    def parse_row(row):
        """Map a guru/tendik row to fields. Columns (0-indexed):
        0=No, 1=Nama, 2=NUPTK, 3=JK, 4=Tempat Lahir, 5=Tanggal Lahir, 6=NIP,
        7=Status Kepegawaian, 8=Jenis PTK, 9=Agama, ..., 18=Telepon, 19=HP,
        20=Email, 21=Tugas Tambahan
        """
        def g(i):
            v = row[i] if i < len(row) else None
            return str(v).strip() if v is not None else ""
        return {
            "name": g(1),
            "nuptk": g(2),
            "gender": g(3),  # L / P
            "nip": g(6),
            "status_pegawai": g(7),   # PNS / PPPPK
            "jenis_ptk": g(8),         # Guru / Kepala Sekolah / Tenaga Kependidikan
            "agama": g(9),
            "phone": g(19),            # HP
            "email": g(20),
            "tugas_tambahan": g(21),
        }

    # --- daftar-guru (6 regular teachers) ---
    guru_path = os.path.join(UPLOAD, "daftar-guru-SD NEGERI 5 GESING-2026-09-16 07_58_55.xlsx")
    wb = openpyxl.load_workbook(guru_path, data_only=True)
    ws = wb.active
    for row in ws.iter_rows(min_row=6, values_only=True):
        if not row or not row[0]:
            continue
        d = parse_row(row)
        if not d["name"]:
            continue
        pos = class_assignments[class_idx[0] % len(class_assignments)]
        class_idx[0] += 1
        teachers.append({
            "name": d["name"].title() if d["name"].isupper() else d["name"],
            "photo": next_photo(d["gender"]),
            "nip": d["nip"],
            "nuptk": d["nuptk"],
            "position": pos,
            "education": "S1 - PGSD",
            "subject": f"Guru Kelas {pos.split()[-1]}",
            "category": "Guru",
            "gender": d["gender"],
            "phone": d["phone"],
            "email": d["email"],
            "bio": f"{d['status_pegawai']} · {d['agama']}",
            "order": len(teachers) + 2,  # after principal (1) and tendik (2)
        })

    # --- daftar-tendik (principal + staff) ---
    tendik_path = os.path.join(UPLOAD, "daftar-tendik-SD NEGERI 5 GESING-2026-09-16 07_59_09.xlsx")
    wb2 = openpyxl.load_workbook(tendik_path, data_only=True)
    ws2 = wb2.active
    tendik_list = []
    for row in ws2.iter_rows(min_row=6, values_only=True):
        if not row or not row[0]:
            continue
        d = parse_row(row)
        if not d["name"]:
            continue
        tendik_list.append(d)

    # Identify principal (Jenis PTK = Kepala Sekolah) and staff
    principal = None
    staff = []
    for d in tendik_list:
        if d["jenis_ptk"].lower() == "kepala sekolah":
            principal = d
        else:
            staff.append(d)

    # Build principal teacher record (order 1)
    if principal:
        teachers.insert(0, {
            "name": principal["name"].title() if principal["name"].isupper() else principal["name"],
            "photo": "/uploads/teachers/teacher-3.png",  # male authoritative
            "nip": principal["nip"],
            "nuptk": principal["nuptk"],
            "position": "Kepala Sekolah",
            "education": "S1 - PGSD",
            "subject": "Kepemimpinan & Manajemen Sekolah",
            "category": "Guru",
            "gender": principal["gender"],
            "phone": principal["phone"],
            "email": principal["email"],
            "bio": f"Kepala Sekolah · {principal['status_pegawai']} · {principal['agama']}",
            "order": 1,
        })

    # Build staff (Tenaga Kependidikan) records (order 2+)
    for i, d in enumerate(staff):
        teachers.insert(1, {
            "name": d["name"].title() if d["name"].isupper() else d["name"],
            "photo": "/uploads/teachers/teacher-5.png" if d["gender"] == "L" else "/uploads/teachers/teacher-4.png",
            "nip": d["nip"],
            "nuptk": d["nuptk"],
            "position": "Tenaga Kependidikan",
            "education": "SMA / sederajat",
            "subject": d["tugas_tambahan"] or "Operator & Administrasi",
            "category": "Tenaga Kependidikan",
            "gender": d["gender"],
            "phone": d["phone"],
            "email": d["email"],
            "bio": f"{d['status_pegawai']} · {d['agama']}",
            "order": 2 + i,
        })

    # Re-sort by order
    teachers.sort(key=lambda t: t["order"])
    # Reassign order to be sequential 1..N
    for i, t in enumerate(teachers):
        t["order"] = i + 1

    return teachers, principal


def read_students():
    """Read daftar_pd and return student list."""
    path = os.path.join(UPLOAD, "daftar_pd-SD NEGERI 5 GESING-2026-09-16 08_04_04.xlsx")
    wb = openpyxl.load_workbook(path, data_only=True)
    ws = wb.active
    # Header at row 5 (1-indexed). Find the "Rombel Saat Ini" column index.
    header_row = list(ws.iter_rows(min_row=5, max_row=5, values_only=True))[0]
    rombel_idx = None
    for i, h in enumerate(header_row):
        if h and "rombel" in str(h).lower():
            rombel_idx = i
            break

    students = []
    for row in ws.iter_rows(min_row=7, values_only=True):
        if not row or not row[0]:
            continue
        def g(i):
            v = row[i] if i is not None and i < len(row) else None
            return str(v).strip() if v is not None else ""
        name = g(1)
        if not name:
            continue
        nipd = g(2)
        gender = g(3)
        nisn = g(4)
        # rombel like "Kelas 4" -> className "4"
        rombel = g(rombel_idx) if rombel_idx is not None else ""
        class_name = ""
        if rombel:
            parts = rombel.split()
            if len(parts) >= 2 and parts[-1].isdigit():
                class_name = parts[-1]
            elif rombel.isdigit():
                class_name = rombel
        if not class_name:
            class_name = "1"
        # Name capitalization
        display_name = name.title() if name.isupper() else name
        students.append({
            "nis": nipd,
            "nisn": nisn,
            "name": display_name,
            "gender": gender if gender in ("L", "P") else "L",
            "className": class_name,
            "academicYear": "2025/2026",
            "status": "Aktif",
        })
    return students


def read_facilities():
    """Read template-facilities and return facility list."""
    path = os.path.join(UPLOAD, "template-facilities.xlsx")
    wb = openpyxl.load_workbook(path, data_only=True)
    ws = wb.active
    # Headers at row 1: Nama Fasilitas, Kategori, Kondisi (BAIK/RUSAK_RINGAN/RUSAK_BERAT), Jumlah, Keterangan
    cond_map = {
        "BAIK": "Baik",
        "RUSAK_RINGAN": "Rusak Ringan",
        "RUSAK_BERAT": "Rusak Berat",
    }
    # Photo mapping by category
    photo_map = {
        "Ruang Kelas": "/uploads/facilities/facility-classroom.jpg",
        "Ruang Guru": "/uploads/facilities/facility-teacher-room.jpg",
        "Ruang Kepala Sekolah": "/uploads/facilities/facility-principal.jpg",
        "Perpustakaan": "/uploads/facilities/facility-library.jpg",
        "UKS": "/uploads/facilities/facility-uks.jpg",
        "Toilet": "/uploads/facilities/facility-toilet.jpg",
        "Lapangan": "/uploads/facilities/facility-field.jpg",
        "Peralatan Pembelajaran": "/uploads/facilities/facility-computer.jpg",
        "Ruang Pendukung": "/uploads/facilities/facility-computer.jpg",
        "Fasilitas Lainnya": "/uploads/facilities/facility-field.jpg",
    }
    facilities = []
    order = 1
    for row in ws.iter_rows(min_row=2, values_only=True):
        if not row or not row[0]:
            continue
        def g(i):
            v = row[i] if i < len(row) else None
            return str(v).strip() if v is not None else ""
        name = g(0)
        category = g(1)
        cond_raw = g(2).upper()
        condition = cond_map.get(cond_raw, "Baik")
        try:
            quantity = int(g(3)) if g(3) else 1
        except ValueError:
            quantity = 1
        description = g(4)
        facilities.append({
            "name": name,
            "photo": photo_map.get(category, ""),
            "category": category or "Fasilitas Lainnya",
            "quantity": quantity,
            "condition": condition,
            "description": description,
            "order": order,
        })
        order += 1
    return facilities


def main():
    teachers, principal = read_teachers()
    students = read_students()
    facilities = read_facilities()

    # Organization structure derived from teachers
    organization = []
    for t in teachers:
        organization.append({
            "name": t["name"],
            "position": t["position"],
            "photo": t["photo"],
            "order": t["order"],
        })

    # Headmaster update for school profile
    headmaster = None
    if principal:
        headmaster = {
            "name": principal["name"].title() if principal["name"].isupper() else principal["name"],
            "photo": "/uploads/teachers/teacher-3.png",
            "nip": principal["nip"],
        }

    output = {
        "teachers": teachers,
        "students": students,
        "facilities": facilities,
        "organization": organization,
        "headmaster": headmaster,
        "stats": [
            {"label": "Jumlah GTK", "value": len(teachers), "icon": "Users", "order": 1},
            {"label": "Jumlah Siswa", "value": len(students), "icon": "GraduationCap", "order": 2},
            {"label": "Jumlah Kelas", "value": 6, "icon": "School", "order": 3},
            {"label": "Sarana & Prasarana", "value": len(facilities), "icon": "Building2", "order": 4},
        ],
    }
    out_path = "/home/z/my-project/scripts/import-data.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"Wrote {out_path}")
    print(f"  teachers: {len(teachers)}")
    print(f"  students: {len(students)}")
    print(f"  facilities: {len(facilities)}")
    print(f"  organization: {len(organization)}")
    if headmaster:
        print(f"  headmaster: {headmaster['name']}")
    # Print class distribution
    from collections import Counter
    classes = Counter(s["className"] for s in students)
    print(f"  class distribution: {dict(sorted(classes.items()))}")
    genders = Counter(s["gender"] for s in students)
    print(f"  gender distribution: {dict(genders)}")


if __name__ == "__main__":
    main()
