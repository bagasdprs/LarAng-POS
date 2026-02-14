import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // Data untuk 4 Kartu Statistik Atas
  stats = [
    {
      label: 'Total Sales',
      value: '$12,450.00',
      trend: '+15% vs last week',
      isUp: true,
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      label: 'Orders',
      value: '1,245',
      trend: '+5% vs last week',
      isUp: true,
      icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    },
    {
      label: 'New Customers',
      value: '32',
      trend: '0% vs yesterday',
      isUp: false,
      icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
    },
    {
      label: 'Out of Stock',
      value: '4 Items',
      trend: 'Restock needed',
      isAlert: true,
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    },
  ];

  // Data Dummy untuk Tabel Transaksi
  recentTransactions = [
    {
      id: '#TRX-8859',
      date: 'Oct 24, 2023',
      time: '10:45 AM',
      customer: 'Jane Doe',
      amount: '$124.50',
      status: 'Completed',
    },
    {
      id: '#TRX-8858',
      date: 'Oct 24, 2023',
      time: '09:30 AM',
      customer: 'Michael Chen',
      amount: '$45.00',
      status: 'Completed',
    },
    {
      id: '#TRX-8857',
      date: 'Oct 24, 2023',
      time: '09:15 AM',
      customer: 'Sarah Williams',
      amount: '$210.00',
      status: 'Pending',
    },
  ];
}
