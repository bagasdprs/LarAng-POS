<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    // ==========================================
    // 1. FUNGSI LOGIN (Sudah Mantap)
    // ==========================================
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Kredensial yang Anda masukkan salah.'],
            ]);
        }

        // Hapus token lama biar gak numpuk (Satu device login)
        $user->tokens()->delete();

        // Bikin Token Baru
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login Berhasil',
            'access_token' => $token,
            'token_type' => 'Bearer',
            // Pakai optional() jaga-jaga kalau relasi role belum ada biar gak error
            'user' => $user->load('role')
        ]);
    }

    // ==========================================
    // 2. FUNGSI REGISTER (BARU DITAMBAHKAN) ✨
    // ==========================================
    public function register(Request $request)
    {
        // Validasi input dari form Angular
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'string',
                // 👇 INI DIA LOGIKA KEAMANANNYA! 👇
                Password::min(8)        // Minimal 8 karakter
                    ->mixedCase()       // Harus ada huruf besar & kecil
                    ->numbers()         // Harus ada angka
                    ->symbols()         // Harus ada simbol (!@#$% dll)
            ],
        ]);

        // Simpan data user baru ke database
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Password wajib di-hash!
            // 'role_id' => 2 // (Opsional) Nanti bisa diaktifkan kalau defaultnya Kasir
        ]);

        // Langsung buatkan token biar habis register otomatis login
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registrasi Berhasil',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ], 201); // 201 = Created
    }

    // ==========================================
    // 3. FUNGSI LOGOUT
    // ==========================================
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout Berhasil']);
    }
}
