using test.Models;

namespace test.Services;

public class TienDoCheBienService
{
    private readonly QuanLyNhaHangContext _db;
    public TienDoCheBienService(QuanLyNhaHangContext db) => _db = db;

    public async Task<(TrangThaiMon TrangThai, DateTime? Goi, DateTime? HoanThanh)?> DocMonAsync(int maHD, int maMon)
    {
        var e = await _db.ChiTietHoaDons.FindAsync(maHD, maMon);
        if (e is null) return null;
        var en = _db.Entry(e);
        return (en.Property<TrangThaiMon>(TenCot.TrangThaiMon).CurrentValue,
                en.Property<DateTime?>(TenCot.ThoiGianGoi).CurrentValue,
                en.Property<DateTime?>(TenCot.ThoiGianHoanThanh).CurrentValue);
    }

    /// Tùy chọn: gọi khi tạo món mới nếu muốn set ngay từ C# (DB cũng tự điền mặc định).
    public void DanhDauMonMoi(ChiTietHoaDon ct)
    {
        var en = _db.Entry(ct);
        en.Property<TrangThaiMon>(TenCot.TrangThaiMon).CurrentValue = TrangThaiMon.ChoNau;
        en.Property<DateTime?>(TenCot.ThoiGianGoi).CurrentValue = DateTime.UtcNow;
    }

    public async Task<bool> CapNhatMonAsync(int maHD, int maMon, TrangThaiMon moi)
    {
        var e = await _db.ChiTietHoaDons.FindAsync(maHD, maMon);
        if (e is null) return false;

        var en = _db.Entry(e);
        var tt = en.Property<TrangThaiMon>(TenCot.TrangThaiMon);
        if (tt.CurrentValue == moi) return true;            // polling lặp lại: không ghi gì

        tt.CurrentValue = moi;
        var hoanThanh = en.Property<DateTime?>(TenCot.ThoiGianHoanThanh);
        if (moi == TrangThaiMon.DaXong)
            hoanThanh.CurrentValue ??= DateTime.UtcNow;
        else
            hoanThanh.CurrentValue = null;                  // quay lại ChoNau/DangNau

        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> CapNhatBanAsync(int maBan, TrangThaiBan moi)
    {
        var e = await _db.Bans.FindAsync(maBan);
        if (e is null) return false;

        var en = _db.Entry(e);
        var batDau = en.Property<DateTime?>(TenCot.ThoiGianBatDauNau);
        en.Property<TrangThaiBan>(TenCot.TrangThaiBan).CurrentValue = moi;

        if (moi == TrangThaiBan.DangNau)
            batDau.CurrentValue ??= DateTime.UtcNow;        // chỉ set lần đầu, không ghi đè
        else if (moi == TrangThaiBan.Trong)
            batDau.CurrentValue = null;                     // bàn trống: reset mốc

        await _db.SaveChangesAsync();                       // không đổi gì thì EF không phát lệnh UPDATE
        return true;
    }

    public async Task<(TrangThaiBan TrangThai, DateTime? BatDauNau)?> DocBanAsync(int maBan)
    {
        var e = await _db.Bans.FindAsync(maBan);
        if (e is null) return null;
        var en = _db.Entry(e);
        return (en.Property<TrangThaiBan>(TenCot.TrangThaiBan).CurrentValue,
                en.Property<DateTime?>(TenCot.ThoiGianBatDauNau).CurrentValue);
    }
}