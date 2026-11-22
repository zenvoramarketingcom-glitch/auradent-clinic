import React, { useState, useEffect } from 'react';
import { INITIAL_BOOKINGS, DOCTORS, SERVICES, CLINIC_INFO } from '../data/dentalData';
import { 
  getBookings, addBooking, updateBookingStatus, deleteBooking, isSupabaseConfigured 
} from '../lib/supabaseClient';
import {
  Users, CheckCircle2, Clock, AlertTriangle, Calendar, Phone,
  Search, Filter, Plus, Download, MessageSquare, Trash2, Edit3,
  X, Check, RefreshCw, Eye, Sparkles, ArrowLeft, Database, ExternalLink, HelpCircle
} from 'lucide-react';

export default function AdminPanel({ onExit }) {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [doctorFilter, setDoctorFilter] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState('local');
  const [showConfigModal, setShowConfigModal] = useState(false);

  // New manual booking form state for receptionist
  const [newBooking, setNewBooking] = useState({
    patientName: '',
    phone: '',
    email: '',
    service: SERVICES[0].title,
    doctor: DOCTORS[0].name,
    date: new Date().toISOString().split('T')[0],
    time: '10:00 PM',
    address: 'Delhi',
    symptoms: 'Walk-in / Phone Consultation',
    status: 'Confirmed'
  });

  // Load bookings from Supabase (or fallback)
  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const res = await getBookings();
      setBookings(res.data);
      setDataSource(res.source);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    // Optimistic update
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
    await updateBookingStatus(id, newStatus);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      await deleteBooking(id);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const token = `AUR-${Math.floor(10000 + Math.random() * 90000)}`;
    const createdItem = {
      ...newBooking,
      id: token,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      promoApplied: 'NEWIND30 (Walk-in Offer)'
    };
    setBookings((prev) => [createdItem, ...prev]);
    setIsAddModalOpen(false);
    await addBooking(createdItem);

    setNewBooking({
      patientName: '',
      phone: '',
      email: '',
      service: SERVICES[0].title,
      doctor: DOCTORS[0].name,
      date: new Date().toISOString().split('T')[0],
      time: '10:00 PM',
      address: 'Delhi',
      symptoms: 'Walk-in / Phone Consultation',
      status: 'Confirmed'
    });
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Patient Name', 'Phone', 'Service', 'Doctor', 'Date', 'Time', 'Address', 'Status', 'Symptoms'];
    const rows = bookings.map((b) => [
      b.id,
      `"${b.patientName}"`,
      `"${b.phone}"`,
      `"${b.service}"`,
      `"${b.doctor}"`,
      b.date,
      b.time,
      `"${b.address || ''}"`,
      b.status,
      `"${b.symptoms || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `auradent_appointments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppPatient = (b) => {
    const msg = `Hello ${b.patientName}, this is AuraDent Studio, Inderlok. We are contacting you regarding your appointment for ${b.service} with ${b.doctor} on ${b.date} at ${b.time}. Your token ID is ${b.id}. Clinic location: Near Inderlok Metro Station. Please let us know if you need any assistance!`;
    const cleanPhone = b.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Filtered Bookings
  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone?.includes(searchTerm) ||
      b.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.service?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchesDoctor = doctorFilter === 'All' || b.doctor === doctorFilter;
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  // Metrics
  const totalCount = bookings.length;
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;
  const completedCount = bookings.filter((b) => b.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-16">
      
      {/* Top Admin Navbar */}
      <header className="bg-slate-950/90 border-b border-sky-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="flex items-center gap-2 text-xs font-semibold bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 px-3 py-2 rounded-xl border border-sky-400/30 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Clinic Site</span>
            </button>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-lg tracking-tight">AuraDent Studio</span>
                <span className="text-[10px] bg-sky-500 text-white font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Admin Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Reception & Doctor Management Desk — Inderlok Branch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAppointments}
              disabled={isLoading}
              title="Refresh Appointments"
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 px-3 py-2 rounded-xl border border-slate-700 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 px-3.5 py-2 rounded-xl border border-slate-700 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-xs text-white font-bold px-4 py-2 rounded-xl shadow-lg shadow-sky-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Walk-in Booking</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Backend & Supabase Status Banner */}
        <div className="mb-6 p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/70 border-sky-900/40">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              dataSource === 'supabase' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
            }`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Backend Status:</span>
                {dataSource === 'supabase' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Supabase Cloud Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    Local Storage Mode (Ready for Supabase)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {dataSource === 'supabase'
                  ? 'All bookings are synced in real-time with your live Supabase PostgreSQL database.'
                  : 'Bookings are currently saved in browser cache. Add your Supabase credentials in .env to sync with cloud.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowConfigModal(true)}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-sky-300 font-semibold px-3 py-1.5 rounded-xl border border-sky-500/30 transition-all flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Supabase Setup Guide & SQL</span>
            </button>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold px-3 py-1.5 rounded-xl border border-emerald-500/30 transition-all flex items-center gap-1.5"
            >
              <span>Supabase Dashboard</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-sky-900/40 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>Total Appointments</span>
              <Users className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-3xl font-black text-white">{totalCount}</div>
            <span className="text-[11px] text-sky-400 mt-1 block">Live registered patients</span>
          </div>

          <div className="bg-slate-950/60 p-5 rounded-2xl border border-emerald-900/40 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>Confirmed Slots</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">{confirmedCount}</div>
            <span className="text-[11px] text-emerald-400 mt-1 block">Ready for treatment</span>
          </div>

          <div className="bg-slate-950/60 p-5 rounded-2xl border border-amber-900/40 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>Pending Review</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">{pendingCount}</div>
            <span className="text-[11px] text-amber-400 mt-1 block">Awaiting confirmation</span>
          </div>

          <div className="bg-slate-950/60 p-5 rounded-2xl border border-purple-900/40 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>Completed</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-purple-400">{completedCount}</div>
            <span className="text-[11px] text-purple-400 mt-1 block">Successful visits</span>
          </div>
        </div>

        {/* Search, Filter & Quick Tools Bar */}
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by Patient Name, Phone, or Token..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === st
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Doctor Filter */}
          <div className="w-full md:w-auto">
            <select
              value={doctorFilter}
              onChange={(e) => setDoctorFilter(e.target.value)}
              className="w-full md:w-auto px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="All">All Specialists</option>
              {DOCTORS.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900/90 text-slate-400 uppercase font-semibold tracking-wider border-b border-slate-800">
                  <th className="py-3.5 px-4">Token & Patient</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Service & Doctor</th>
                  <th className="py-3.5 px-4">Scheduled Slot</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-500">
                      No matching appointments found. Try clearing filters or search term.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                      {/* Patient & Token */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm">{item.patientName}</div>
                        <div className="text-[11px] font-mono text-sky-400">{item.id}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[140px]">{item.address}</div>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4">
                        <div className="text-slate-200 font-medium">{item.phone}</div>
                        <div className="text-slate-400 text-[11px] truncate max-w-[140px]">{item.email}</div>
                      </td>

                      {/* Service & Doctor */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-sky-300">{item.service}</div>
                        <div className="text-slate-400 text-[11px]">{item.doctor}</div>
                      </td>

                      {/* Slot */}
                      <td className="py-3.5 px-4">
                        <div className="text-white font-medium flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-sky-400" />
                          <span>{item.date}</span>
                        </div>
                        <div className="text-amber-300 text-[11px] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.time}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                            item.status === 'Confirmed'
                              ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                              : item.status === 'Pending'
                              ? 'bg-amber-950/60 text-amber-400 border-amber-800'
                              : item.status === 'Completed'
                              ? 'bg-purple-950/60 text-purple-400 border-purple-800'
                              : 'bg-rose-950/60 text-rose-400 border-rose-800'
                          }`}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleWhatsAppPatient(item)}
                            title="WhatsApp Patient"
                            className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/40 border border-emerald-500/30 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={`tel:${item.phone}`}
                            title="Call Patient"
                            className="p-1.5 rounded-lg bg-sky-600/20 text-sky-400 hover:bg-sky-600/40 border border-sky-500/30 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => setSelectedBooking(item)}
                            title="View Patient Note"
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            title="Delete"
                            className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* DETAIL VIEW MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 text-slate-200">
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider">
                  Token: {selectedBooking.id}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedBooking.patientName}</h3>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">Phone:</span>
                <span className="text-white font-medium">{selectedBooking.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Email:</span>
                <span className="text-white font-medium">{selectedBooking.email || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Address:</span>
                <span className="text-white font-medium">{selectedBooking.address || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Procedure / Doctor:</span>
                <span className="text-sky-300 font-semibold">{selectedBooking.service} ({selectedBooking.doctor})</span>
              </div>
              <div>
                <span className="text-slate-400 block">Date & Time:</span>
                <span className="text-amber-300 font-semibold">{selectedBooking.date} at {selectedBooking.time}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Symptoms / Clinical Notes:</span>
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 mt-1">
                  {selectedBooking.symptoms || 'No specific symptoms entered.'}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => handleWhatsAppPatient(selectedBooking)}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Patient</span>
              </button>
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD WALK-IN MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 text-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-sky-400" />
                <span>Register New Walk-in / Phone Booking</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  value={newBooking.patientName}
                  onChange={(e) => setNewBooking({ ...newBooking, patientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-sky-500 outline-none"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newBooking.phone}
                    onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-sky-500 outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={newBooking.email}
                    onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-sky-500 outline-none"
                    placeholder="patient@gmail.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Service</label>
                  <select
                    value={newBooking.service}
                    onChange={(e) => setNewBooking({ ...newBooking, service: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-sky-500 outline-none"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Doctor</label>
                  <select
                    value={newBooking.doctor}
                    onChange={(e) => setNewBooking({ ...newBooking, doctor: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-sky-500 outline-none"
                  >
                    {DOCTORS.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={newBooking.date}
                    onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Time Slot (Night Clinic)</label>
                  <input
                    type="text"
                    value={newBooking.time}
                    onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-sky-500 outline-none"
                    placeholder="10:30 PM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Address / Area</label>
                <input
                  type="text"
                  value={newBooking.address}
                  onChange={(e) => setNewBooking({ ...newBooking, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-sky-500 outline-none"
                  placeholder="e.g. Inderlok, Delhi"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Symptoms / Notes</label>
                <textarea
                  rows="2"
                  value={newBooking.symptoms}
                  onChange={(e) => setNewBooking({ ...newBooking, symptoms: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-sky-500 outline-none"
                  placeholder="Chief complaint..."
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all shadow-md"
                >
                  Confirm & Save Appointment
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Supabase Setup & SQL Guide Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-sky-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Connect Supabase to AuraDent Clinic</h3>
                  <p className="text-xs text-slate-400">Complete PostgreSQL Database Setup in 3 Simple Steps</p>
                </div>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6 text-xs text-slate-300">
              {/* Step 1 */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-sky-400">Step 1: Create Supabase Project</span>
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-semibold"
                  >
                    <span>Open Supabase Dashboard</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Go to <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-sky-400 underline">supabase.com</a>, log in with GitHub/Google, and click <strong>"New Project"</strong> (e.g. Name: <em>auradent-clinic</em>, Region: <em>South Asia / Mumbai</em>).
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="font-bold text-sm text-sky-400 block mb-2">Step 2: Run SQL Schema to Create Table</span>
                <p className="text-slate-400 leading-relaxed mb-3">
                  In your Supabase project dashboard, click <strong>"SQL Editor"</strong> in the left sidebar, click <strong>"New Query"</strong>, paste the code below, and click <strong>"Run"</strong>:
                </p>
                <div className="relative">
                  <pre className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-sky-300 overflow-x-auto max-h-44">
{`CREATE TABLE public.bookings (
    id TEXT PRIMARY KEY,
    patient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service TEXT NOT NULL,
    doctor TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    address TEXT,
    symptoms TEXT,
    status TEXT NOT NULL DEFAULT 'Confirmed',
    promo_applied TEXT DEFAULT 'None',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all" ON public.bookings FOR ALL TO public USING (true) WITH CHECK (true);`}
                  </pre>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="font-bold text-sm text-sky-400 block mb-2">Step 3: Add Credentials to .env File</span>
                <p className="text-slate-400 leading-relaxed mb-3">
                  Go to <strong>Project Settings → API</strong>. Copy your <strong>Project URL</strong> and <strong>anon (public) API Key</strong>, then paste them inside your project file:
                </p>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400">
                  <p># File path: dental-clinic-web/.env</p>
                  <p className="mt-1">VITE_SUPABASE_URL=https://your-project-id.supabase.co</p>
                  <p>VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
