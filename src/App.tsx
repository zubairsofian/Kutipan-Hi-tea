import React, { useState, useMemo } from 'react';
import PastelTheme from './components/PastelTheme';
import { senaraiGuruAsal, KADAR_BAYARAN } from './data';
import { StatusBayaran, ThemeProps } from './types';

export default function App() {
  const [senaraiGuru, setSenaraiGuru] = useState(
    senaraiGuruAsal.map(guru => ({ ...guru, status: 'Belum Bayar' as StatusBayaran }))
  );
  const [carian, setCarian] = useState('');

  const tukarStatus = (id: number, statusBaru: StatusBayaran) => {
    setSenaraiGuru(prev =>
      prev.map(guru => (guru.id === id ? { ...guru, status: statusBaru } : guru))
    );
  };

  // Derive stats
  const statistik = useMemo(() => {
    let bilTunai = 0;
    let bilBankIn = 0;
    let sudahBayar = 0;

    senaraiGuru.forEach(g => {
      if (g.status === 'Tunai') {
        bilTunai++;
        sudahBayar++;
      } else if (g.status === 'Bank-in') {
        bilBankIn++;
        sudahBayar++;
      }
    });

    return {
      sudahBayar,
      belumBayar: senaraiGuru.length - sudahBayar,
      jumlahTunai: bilTunai * KADAR_BAYARAN,
      jumlahBankIn: bilBankIn * KADAR_BAYARAN,
      jumlahKutipan: sudahBayar * KADAR_BAYARAN,
      bilTunai,
      bilBankIn
    };
  }, [senaraiGuru]);

  const themeProps: ThemeProps = {
    senaraiGuru,
    carian,
    setCarian,
    tukarStatus,
    statistik,
    kadarBayaran: KADAR_BAYARAN
  };

  return (
    <PastelTheme {...themeProps} />
  );
}
