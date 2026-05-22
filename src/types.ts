export type StatusBayaran = 'Belum Bayar' | 'Tunai' | 'Bank-in';

export interface Guru {
  id: number;
  nama: string;
  status: StatusBayaran;
}

export interface ThemeProps {
  senaraiGuru: Guru[];
  carian: string;
  setCarian: (val: string) => void;
  tukarStatus: (id: number, statusBaru: StatusBayaran) => void;
  statistik: {
    sudahBayar: number;
    belumBayar: number;
    jumlahTunai: number;
    jumlahBankIn: number;
    jumlahKutipan: number;
    bilTunai: number;
    bilBankIn: number;
  };
  kadarBayaran: number;
}
