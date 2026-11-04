using Microsoft.EntityFrameworkCore;

namespace test.Models;

public enum TrangThaiMon
{
    ChoNau = 0,     // = 0 để khớp mặc định CLR và mặc định DB
    DangNau = 1,
    DaXong = 2
}

public enum TrangThaiBan
{
    Trong = 0,
    CoKhach = 1,
    DangNau = 2,
    CanNhanVien = 3
}

public static class TenCot
{
    public const string TrangThaiMon = "TrangThaiMon";
    public const string ThoiGianGoi = "ThoiGianGoi";
    public const string ThoiGianHoanThanh = "ThoiGianHoanThanh";
    public const string TrangThaiBan = "TrangThaiBan";
    public const string ThoiGianBatDauNau = "ThoiGianBatDauNau";
}

public static class TienDoCheBienModel
{
    public static void Ap(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ChiTietHoaDon>(entity =>
        {
            entity.Property<TrangThaiMon>(TenCot.TrangThaiMon)
                .HasConversion<string>()
                .HasMaxLength(20)
                .IsUnicode(false)
                .IsRequired()
                .HasDefaultValue(TrangThaiMon.ChoNau);

            // Nullable: dòng cũ giữ NULL, dòng mới được DB điền giờ hiện tại (UTC)
            entity.Property<DateTime?>(TenCot.ThoiGianGoi)
                .HasColumnType("datetime2(3)")
                .HasDefaultValueSql("SYSUTCDATETIME()");

            entity.Property<DateTime?>(TenCot.ThoiGianHoanThanh)
                .HasColumnType("datetime2(3)");

            entity.HasIndex(TenCot.TrangThaiMon);
        });

        modelBuilder.Entity<Ban>(entity =>
        {
            entity.Property<TrangThaiBan>(TenCot.TrangThaiBan)
                .HasConversion<string>()
                .HasMaxLength(20)
                .IsUnicode(false)
                .IsRequired()
                .HasDefaultValue(TrangThaiBan.Trong);

            entity.Property<DateTime?>(TenCot.ThoiGianBatDauNau)
                .HasColumnType("datetime2(3)");
        });
    }
}