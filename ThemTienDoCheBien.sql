IF COL_LENGTH('ChiTietHoaDon','TrangThaiMon') IS NULL
    ALTER TABLE ChiTietHoaDon ADD TrangThaiMon varchar(20) NOT NULL
        CONSTRAINT DF_ChiTietHoaDon_TrangThaiMon DEFAULT 'ChoNau';
IF COL_LENGTH('ChiTietHoaDon','ThoiGianGoi') IS NULL
    ALTER TABLE ChiTietHoaDon ADD ThoiGianGoi datetime2(3) NULL
        CONSTRAINT DF_ChiTietHoaDon_ThoiGianGoi DEFAULT SYSUTCDATETIME();
IF COL_LENGTH('ChiTietHoaDon','ThoiGianHoanThanh') IS NULL
    ALTER TABLE ChiTietHoaDon ADD ThoiGianHoanThanh datetime2(3) NULL;

IF COL_LENGTH('Ban','TrangThaiBan') IS NULL
    ALTER TABLE Ban ADD TrangThaiBan varchar(20) NOT NULL
        CONSTRAINT DF_Ban_TrangThaiBan DEFAULT 'Trong';
IF COL_LENGTH('Ban','ThoiGianBatDauNau') IS NULL
    ALTER TABLE Ban ADD ThoiGianBatDauNau datetime2(3) NULL;

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_ChiTietHoaDon_TrangThaiMon')
    CREATE INDEX IX_ChiTietHoaDon_TrangThaiMon ON ChiTietHoaDon(TrangThaiMon);
GO

-- TÙY CHỌN: đồng bộ dữ liệu cũ (bỏ comment nếu muốn)
-- UPDATE Ban SET TrangThaiBan = CASE WHEN TrangThai = N'Trống' THEN 'Trong' ELSE 'CoKhach' END;
-- UPDATE ct SET TrangThaiMon = 'DaXong'
--   FROM ChiTietHoaDon ct JOIN HoaDon hd ON hd.MaHD = ct.MaHD
--  WHERE hd.TrangThai = N'Đã thanh toán';