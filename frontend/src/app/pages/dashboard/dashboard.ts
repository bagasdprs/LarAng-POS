import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private dashboardService = inject(DashboardService);
  private cdr = inject(ChangeDetectorRef);

  stats = [
    {
      label: 'Revenue Today',
      value: 'Loading...',
      trend: 'vs yesterday',
      isUp: true,
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      label: 'Orders Today',
      value: 'Loading...',
      trend: 'Total transactions',
      isUp: true,
      icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    },
    {
      label: 'Monthly Revenue',
      value: 'Loading...',
      trend: 'This month',
      isUp: true,
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      label: 'Out of Stock',
      value: '4 Items',
      trend: 'Restock needed',
      isAlert: true,
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    },
  ];

  recentTransactions = [
    {
      id: '#TRX-8859',
      date: 'Oct 24, 2023',
      time: '10:45 AM',
      customer: 'Jane Doe',
      amount: 'Rp 124.500',
      status: 'Completed',
    },
    {
      id: '#TRX-8858',
      date: 'Oct 24, 2023',
      time: '09:30 AM',
      customer: 'Michael Chen',
      amount: 'Rp 45.000',
      status: 'Completed',
    },
    {
      id: '#TRX-8857',
      date: 'Oct 24, 2023',
      time: '09:15 AM',
      customer: 'Sarah Williams',
      amount: 'Rp 210.000',
      status: 'Pending',
    },
  ];

  ngOnInit() {
    console.log('📡 [CCTV 1] Halaman Dashboard dimuat, bersiap manggil API...');
    this.fetchData();
  }

  fetchData() {
    this.dashboardService.getDashboardStats().subscribe({
      next: (response: any) => {
        console.log('✅ [CCTV 2] YEY! Balasan datang:', response);

        if (response.status === 'success') {
          const apiData = response.data;

          const revToday = Number(apiData.revenue_today) || 0;
          const trxToday = Number(apiData.transactions_today) || 0;
          const revMonth = Number(apiData.revenue_this_month) || 0;

          console.log('🎯 [CCTV 3] Angka diproses:', { revToday, trxToday, revMonth });

          // Ubah nilai satu per satu
          this.stats[0].value = 'Rp ' + revToday.toLocaleString('id-ID');
          this.stats[1].value = trxToday.toString();
          this.stats[2].value = 'Rp ' + revMonth.toLocaleString('id-ID');

          // 👈 TENDANG ANGULAR BIAR LANGSUNG UPDATE LAYAR!
          this.cdr.detectChanges();
          console.log('🚀 [CCTV 4] UI berhasil dipaksa update!');
        }
      },
      error: (err: any) => {
        console.error('❌ [CCTV Error] Gagal narik API:', err);
        this.stats[0].value = 'Rp 0';
        this.stats[1].value = '0';
        this.stats[2].value = 'Rp 0';

        // Tendang juga layarnya kalau error
        this.cdr.detectChanges();
      },
    });
  }
}
