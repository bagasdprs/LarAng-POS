<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // 1. Fungsi untuk mengambil semua data user beserta role-nya
    public function index()
    {
        // Kita tarik data user, urutkan dari yang terbaru
        // Gunakan leftJoin kalau relasi eloquent di Model User belum disetting
        $users = User::select('users.id', 'users.name', 'users.email', 'users.role_id', 'roles.name as role_name')
            ->leftJoin('roles', 'users.role_id', '=', 'roles.id')
            ->orderBy('users.created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Data User Berhasil Diambil',
            'data' => $users
        ]);
    }

    // 2. Fungsi untuk menyetujui (Approve) user baru menjadi KASIR
    public function approveAsKasir($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        // Set role_id menjadi 3 (Kasir)
        $user->role_id = 3;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User berhasil disetujui sebagai Kasir!',
            'data' => $user
        ]);
    }

    // ==========================================
    // 3. FUNGSI CREATE USER BARU
    // ==========================================
    public function store(Request $request)
    {
        $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'role' => 'required|string'
        ]);

        // Peta/Kamus penerjemah Role dari UI ke Database
        $roleMap = ['Admin' => 1, 'CEO' => 2, 'Kasir' => 3];
        $roleId = $roleMap[$request->role] ?? 3; // Default Kasir kalau nggak ketemu

        $user = User::create([
            'name' => $request->fullName,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Wajib di-hash!
            'role_id' => $roleId
        ]);

        return response()->json(['success' => true, 'message' => 'User berhasil dibuat!', 'data' => $user], 201);
    }

    // ==========================================
    // 4. FUNGSI EDIT USER
    // ==========================================
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) return response()->json(['message' => 'User tidak ditemukan'], 404);

        $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id, // Email boleh sama asal punya dia sendiri
            'role' => 'required|string'
        ]);

        $roleMap = ['Admin' => 1, 'CEO' => 2, 'Kasir' => 3];

        $user->name = $request->fullName;
        $user->email = $request->email;
        $user->role_id = $roleMap[$request->role] ?? 3;

        // Kalau password diisi di form, berarti dia mau ganti password
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json(['success' => true, 'message' => 'User berhasil diupdate!', 'data' => $user]);
    }
}
