using Microsoft.EntityFrameworkCore;
using test.Models;
using test.Services;
using Xunit;

namespace test.Tests;

public class TienDoCheBienTests
{
    private class TestContext : QuanLyNhaHangContext
    {
        public TestContext(DbContextOptions<QuanLyNhaHangContext> o) : base(o) { }
        protected override void OnConfiguring(DbContextOptionsBuilder b) { }   // bỏ UseSqlServer
    }

    private static QuanLyNhaHangContext TaoDb() =>
        new TestContext(new DbContextOptionsBuilder<QuanLyNhaHangContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString()).Options);

    [Fact]
    public async Task MonMoi_MacDinhChoNau_VaCoThoiGianGoi()
    {
        using var db = TaoDb();
        var svc = new TienDoCheBienService(db);
        var ct = new ChiTietHoaDon { MaHD = 1, MaMon = 1, SoLuong = 2, DonGia = 50000 };
        svc.DanhDauMonMoi(ct);
        db.ChiTietHoaDons.Add(ct);
        await db.SaveChangesAsync();

        var r = await svc.DocMonAsync(1, 1);
        Assert.Equal(TrangThaiMon.ChoNau, r!.Value.TrangThai);
        Assert.NotNull(r.Value.Goi);
        Assert.Null(r.Value.HoanThanh);
    }

    [Fact]
    public async Task DaXong_GhiThoiGianHoanThanh_KhongBiGhiDeKhiPolling()
    {
        using var db = TaoDb();
        var svc = new TienDoCheBienService(db);
        db.ChiTietHoaDons.Add(new ChiTietHoaDon { MaHD = 1, MaMon = 1, SoLuong = 1, DonGia = 1 });
        await db.SaveChangesAsync();

        await svc.CapNhatMonAsync(1, 1, TrangThaiMon.DangNau);
        await svc.CapNhatMonAsync(1, 1, TrangThaiMon.DaXong);
        var t1 = (await svc.DocMonAsync(1, 1))!.Value.HoanThanh;
        await Task.Delay(20);
        await svc.CapNhatMonAsync(1, 1, TrangThaiMon.DaXong);   // polling lặp
        var t2 = (await svc.DocMonAsync(1, 1))!.Value.HoanThanh;

        Assert.NotNull(t1);
        Assert.Equal(t1, t2);
    }

    [Fact]
    public async Task Ban_MocBatDauNau_KhongBiGhiDe_VaResetKhiTrong()
    {
        using var db = TaoDb();
        var svc = new TienDoCheBienService(db);
        var ban = new Ban { SoBan = "B01", SoChoNgoi = 4 };
        db.Bans.Add(ban);
        await db.SaveChangesAsync();

        await svc.CapNhatBanAsync(ban.MaBan, TrangThaiBan.DangNau);
        var t1 = (await svc.DocBanAsync(ban.MaBan))!.Value.BatDauNau;
        await Task.Delay(20);
        await svc.CapNhatBanAsync(ban.MaBan, TrangThaiBan.DangNau);
        await svc.CapNhatBanAsync(ban.MaBan, TrangThaiBan.CanNhanVien);
        await svc.CapNhatBanAsync(ban.MaBan, TrangThaiBan.DangNau);
        var t2 = (await svc.DocBanAsync(ban.MaBan))!.Value.BatDauNau;

        Assert.NotNull(t1);
        Assert.Equal(t1, t2);

        await svc.CapNhatBanAsync(ban.MaBan, TrangThaiBan.Trong);
        Assert.Null((await svc.DocBanAsync(ban.MaBan))!.Value.BatDauNau);
    }
}