import React, { useState } from 'react';
import { 
  LayoutDashboard, Wrench, ShoppingCart, Users, Search, Bell, Plus, 
  CheckCircle, Clock, AlertCircle, Menu, Settings, FileText, 
  PieChart, DollarSign, Smartphone, Tablet, Laptop, Gamepad, 
  Watch, User, MoreVertical, Filter, Download, Upload, Monitor,
  Bot, X, Globe, Megaphone, CreditCard, Send
} from 'lucide-react';

export const ProductTour: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('pos');

  const NAV_ITEMS = [
    { id: 'repairs', label: 'Repairs', icon: Wrench },
    { id: 'mendrix', label: 'Mendrix', icon: Bot },
    { id: 'inventory', label: 'Inventory', icon: LayoutDashboard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'pos', label: 'Point Of Sale', icon: ShoppingCart },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'meta', label: 'Meta Business', icon: Globe },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'campaigner', label: 'Campaigner', icon: Megaphone },
    { id: 'expense', label: 'Expense', icon: CreditCard },
  ];

  // Mock Data
  const TICKETS = [
    { id: 'TKT-58291', customer: 'John Doe', date: '2024-05-20', status: 'Completed', total: '$427.90', statusColor: 'text-green-400' },
    { id: 'TKT-58290', customer: 'Jane Smith', date: '2024-05-20', status: 'In Progress', total: '$108.90', statusColor: 'text-blue-400' },
    { id: 'TKT-58288', customer: 'PC Build Inc.', date: '2024-05-19', status: 'Completed', total: '$2450.00', statusColor: 'text-green-400' },
    { id: 'TKT-58287', customer: 'Walk-in', date: '2024-05-18', status: 'Pending', total: '$99.00', statusColor: 'text-yellow-400' },
    { id: 'TKT-58285', customer: 'Bob Johnson', date: '2024-05-17', status: 'Cancelled', total: '$0.00', statusColor: 'text-red-400' },
  ];

  const INVENTORY = [
    { sku: 'SCR-IP15P', name: 'iPhone 15 Pro Screen', stock: 12, cost: '$180.00', price: '$329.00' },
    { sku: 'BAT-IP15', name: 'iPhone 15 Battery', stock: 25, cost: '$45.00', price: '$99.00' },
    { sku: 'CPU-I9', name: 'Intel Core i9-13900K', stock: 5, cost: '$650.00', price: '$900.00' },
    { sku: 'GPU-4090', name: 'NVIDIA GeForce RTX 4090', stock: 2, cost: '$2800.00', price: '$3500.00' },
    { sku: 'RAM-D5', name: '32GB DDR5 6000MHz Kit', stock: 15, cost: '$150.00', price: '$250.00' },
  ];

  const CUSTOMERS = [
    { initials: 'JD', name: 'John Doe', email: 'john.doe@example.com', phone: '555-1234', tickets: 1, revenue: '$427.90', status: 'All work complete', statusColor: 'bg-green-900/50 text-green-400' },
    { initials: 'JS', name: 'Jane Smith', email: 'jane.s@example.com', phone: '555-5678', tickets: 1, revenue: '$108.90', status: '1 open ticket', statusColor: 'bg-yellow-900/50 text-yellow-400' },
    { initials: 'PB', name: 'PC Build Inc.', email: 'accounts@pcbuild.com', phone: '555-8765', tickets: 1, revenue: '$2450.00', status: 'All work complete', statusColor: 'bg-green-900/50 text-green-400' },
    { initials: 'BJ', name: 'Bob Johnson', email: 'bobbyj@example.net', phone: '555-4321', tickets: 1, revenue: '$0.00', status: 'All work complete', statusColor: 'bg-green-900/50 text-green-400' },
  ];

  const POS_CATEGORIES = [
    { name: 'Phone Repairs', mfgs: '3 manufacturers', desc: 'Triaging iPhone, Galaxy, Pixel and other flagship handsets.', icon: Smartphone },
    { name: 'Tablet Repairs', mfgs: '2 manufacturers', desc: 'iPad and Android tablet parts stocked for rapid turnaround.', icon: Tablet },
    { name: 'Laptop Repairs', mfgs: '3 manufacturers', desc: 'MacBook, Surface, and PC parts ready for same-day installs.', icon: Laptop },
    { name: 'Gaming Console', mfgs: '3 manufacturers', desc: 'Restore next-gen consoles from no-power to HDMI faults.', icon: Gamepad },
    { name: 'Smart Watch', mfgs: '3 manufacturers', desc: 'Wearable triage for Apple Watch, Galaxy Watch, and fitness brands.', icon: Watch },
    { name: 'Drone Repairs', mfgs: '2 manufacturers', desc: 'Gimbal, prop, and flight controller swaps for aerial fleets.', icon: Monitor },
  ];

  const SETTINGS_GROUPS = [
    {
      title: 'Quick Access', desc: 'Find any setting instantly.', items: [
        { label: 'Search settings', sub: 'Open the settings explorer' }
      ]
    },
    {
      title: 'Your Profile', desc: 'Manage your personal account details.', items: [
        { label: 'Update profile', sub: 'Edit name, contact email, avatar' },
        { label: 'Update password', sub: 'Change login password' }
      ]
    },
    {
      title: 'Store Settings', desc: 'Company-wide defaults.', items: [
        { label: 'General settings', sub: 'Tax, branding, business hours' },
        { label: 'Manage stores', sub: 'Add or update locations' },
        { label: 'Hardware settings', sub: 'Printers, scanners, labels' }
      ]
    },
    {
      title: 'Employees', desc: 'Control access and shifts.', items: [
        { label: 'Manage employees', sub: 'Invite team members' },
        { label: 'Manage roles', sub: 'Permissions & access control' }
      ]
    },
    {
      title: 'Integrations & Alerts', desc: 'Connect services and respond faster.', items: [
        { label: 'Integrated phone system', sub: 'Screen callers and link tickets' },
        { label: 'Integrations', sub: 'Square, QuickBooks, email' },
        { label: 'Mail-in', sub: 'Automate intake flows' }
      ]
    },
    {
      title: 'Inventory', desc: 'Catalog devices, parts, and accessories.', items: [
        { label: 'Inventory configurations', sub: 'Stock valuation rules' },
        { label: 'Product attributes', sub: 'Custom fields for devices' },
        { label: 'Product categories', sub: 'Organize by product line' }
      ]
    },
    {
      title: 'Point of Sale & Workflows', desc: 'Customize customer-facing flows.', items: [
        { label: 'Invoices', sub: 'Numbering and templates' },
        { label: 'Tickets', sub: 'Lifecycle and SLA targets' },
        { label: 'Repairs', sub: 'Service types and steps' }
      ]
    },
    {
      title: 'Finance & Loyalty', desc: 'Cash flow and retention tools.', items: [
        { label: 'Expense', sub: 'Log business expenses' },
        { label: 'Tax configuration', sub: 'Jurisdictions and exemptions' },
        { label: 'Loyalty', sub: 'Points programs and rules' }
      ]
    }
  ];

  return (
    <section id="demo" className="py-24 bg-slate-900 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-base font-semibold text-brand-400 tracking-wide uppercase">Interactive Demo</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            See how Apex works
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
            A powerful, dark-themed command center for your repair business.
          </p>
        </div>

        {/* Browser/App Window Frame */}
        <div className="relative rounded-lg bg-[#0B1121] shadow-2xl ring-1 ring-white/10 overflow-hidden min-h-[800px] flex flex-col font-sans">
          
          {/* Top Navigation Bar */}
          <div className="bg-[#0B1121] border-b border-[#1F2937] h-14 flex items-center justify-between px-4 sticky top-0 z-20">
            <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 flex-shrink-0">
                <LayoutDashboard className="w-6 h-6 text-brand-500" />
                <span className="text-white font-bold text-lg tracking-tight hidden md:inline">Apex <span className="text-emerald-500">RepairBench</span></span>
              </div>
              <div className="flex items-center space-x-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === item.id 
                        ? (item.id === 'pos' ? 'bg-emerald-500 text-white' : 'text-white bg-[#1F2937]') 
                        : 'text-slate-400 hover:text-white hover:bg-[#1F2937]'
                    }`}
                  >
                    {item.icon && <item.icon className="w-3 h-3" />}
                    <span className="hidden xl:inline">{item.label}</span>
                    <span className="xl:hidden">{item.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-1.5 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Scan or enter Ticket ID" 
                  className="bg-[#1F2937] border border-[#374151] rounded text-slate-300 text-sm pl-9 pr-3 py-1.5 focus:outline-none focus:border-brand-500 w-48"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-1.5 rounded transition hidden sm:block">
                Email Support
              </button>
              <button className="p-2 text-slate-400 hover:text-white bg-[#1F2937] rounded">
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-[#0B1121] p-6 overflow-auto">
            
            {/* VIEW: REPAIRS */}
            {activeTab === 'repairs' && (
              <div className="animate-in fade-in duration-300 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Repair Tickets</h2>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input type="text" placeholder="Search by Ticket ID..." className="bg-[#151E32] border border-[#2A3441] text-slate-300 rounded pl-10 pr-4 py-2 text-sm w-48 md:w-64 focus:outline-none" />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded">
                      New Repair Ticket
                    </button>
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'TICKETS', value: '5', sub: 'Matching current filters' },
                    { label: 'OPEN WORK', value: '2', sub: 'Pending & in progress' },
                    { label: 'COMPLETED', value: '2', sub: 'Closed in the current view' },
                    { label: 'AVG. TICKET', value: '$617.16', sub: 'Revenue per ticket' }
                  ].map((metric, i) => (
                    <div key={i} className="bg-[#151E32] border border-[#2A3441] p-5 rounded-lg">
                      <h4 className="text-xs font-semibold text-slate-400 tracking-wider mb-2">{metric.label}</h4>
                      <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                      <div className="text-xs text-slate-500">{metric.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Pipeline Table */}
                <div className="bg-[#151E32] border border-[#2A3441] rounded-lg p-6 overflow-x-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-medium text-lg">Ticket Pipeline</h3>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded bg-green-900/30 text-green-400 text-xs border border-green-900">Completed 2</span>
                      <span className="px-2 py-1 rounded bg-yellow-900/30 text-yellow-400 text-xs border border-yellow-900">Active 2</span>
                    </div>
                  </div>
                  <table className="w-full text-left min-w-[600px]">
                    <thead>
                      <tr className="text-slate-400 text-sm border-b border-[#2A3441]">
                        <th className="pb-3 pl-4 font-semibold">Ticket ID</th>
                        <th className="pb-3 font-semibold">Customer</th>
                        <th className="pb-3 font-semibold">Date</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 pr-4 font-semibold text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2A3441]">
                      {TICKETS.map((t) => (
                        <tr key={t.id} className="text-sm hover:bg-[#1F2937] transition-colors cursor-pointer group">
                          <td className="py-4 pl-4 text-slate-300 group-hover:text-white">{t.id}</td>
                          <td className="py-4 text-white font-medium">{t.customer}</td>
                          <td className="py-4 text-slate-400">{t.date}</td>
                          <td className={`py-4 ${t.statusColor}`}>{t.status}</td>
                          <td className="py-4 pr-4 text-right text-slate-300">{t.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

             {/* VIEW: MENDRIX */}
             {activeTab === 'mendrix' && (
              <div className="animate-in fade-in duration-300 flex flex-col h-full bg-white rounded-lg overflow-hidden border border-[#2A3441]">
                <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2"><Bot className="w-6 h-6" /> Mendrix AI Assistant</h2>
                    <p className="text-indigo-200 text-xs">Intelligent repair intake orchestration</p>
                  </div>
                </div>
                
                <div className="flex-1 bg-slate-50 p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <Bot className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Mendrix is ready to help</h3>
                  <p className="text-slate-500 max-w-md mt-2">I can help triage devices, look up repair history, or draft estimates based on customer descriptions.</p>
                </div>

                <div className="p-4 bg-white border-t border-slate-200">
                  <div className="flex gap-2">
                    <input type="text" placeholder="Ask me anything about this repair..." className="flex-1 border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
                    <button className="bg-emerald-500 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-600 transition">New Job</button>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: INVENTORY */}
            {activeTab === 'inventory' && (
              <div className="animate-in fade-in duration-300 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Inventory</h2>
                  <div className="flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded">Add New Item</button>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'CATALOG ITEMS', value: '5', sub: 'Matching current filters' },
                    { label: 'UNITS ON HAND', value: '59', sub: 'Physical stock count' },
                    { label: 'STOCK VALUE', value: '$14385.00', sub: 'Cost basis' },
                    { label: 'RETAIL POTENTIAL', value: '$21673.00', sub: 'At list price' }
                  ].map((metric, i) => (
                    <div key={i} className="bg-[#151E32] border border-[#2A3441] p-5 rounded-lg">
                      <h4 className="text-xs font-semibold text-slate-400 tracking-wider mb-2">{metric.label}</h4>
                      <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                      <div className="text-xs text-slate-500">{metric.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Ledger Table */}
                <div className="bg-[#151E32] border border-[#2A3441] rounded-lg p-6 overflow-x-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-medium text-lg">Inventory Ledger</h3>
                    <div className="flex gap-2">
                       <span className="bg-yellow-900/30 text-yellow-500 px-2 py-1 rounded text-xs border border-yellow-900">Low Stock 1</span>
                    </div>
                  </div>
                  <table className="w-full text-left min-w-[600px]">
                    <thead>
                      <tr className="text-slate-400 text-sm border-b border-[#2A3441]">
                        <th className="pb-3 pl-4 font-semibold">SKU</th>
                        <th className="pb-3 font-semibold">Name</th>
                        <th className="pb-3 font-semibold text-center">Stock</th>
                        <th className="pb-3 font-semibold">Cost</th>
                        <th className="pb-3 font-semibold">Price</th>
                        <th className="pb-3 pr-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2A3441]">
                      {INVENTORY.map((item) => (
                        <tr key={item.sku} className="text-sm hover:bg-[#1F2937] transition-colors group">
                          <td className="py-4 pl-4 text-slate-300">{item.sku}</td>
                          <td className="py-4 text-white font-medium">{item.name}</td>
                          <td className="py-4 text-slate-300 text-center">{item.stock}</td>
                          <td className="py-4 text-slate-400">{item.cost}</td>
                          <td className="py-4 text-white font-bold">{item.price}</td>
                          <td className="py-4 pr-4 text-right">
                             <div className="flex justify-end gap-2">
                               <button className="text-xs bg-[#1F2937] hover:bg-slate-700 text-slate-300 px-2 py-1 rounded border border-[#374151]">Edit</button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* VIEW: CUSTOMERS */}
            {activeTab === 'customers' && (
              <div className="animate-in fade-in duration-300 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Customers</h2>
                  <div className="flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded">Add New Customer</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {CUSTOMERS.map((c, i) => (
                    <div key={i} className="bg-[#151E32] border border-[#2A3441] rounded-lg p-5 hover:border-brand-500/50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                         <div className="w-10 h-10 rounded-full bg-[#1F2937] flex items-center justify-center text-brand-400 font-bold border border-[#2A3441]">
                           {c.initials}
                         </div>
                         <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${c.statusColor}`}>{c.status}</span>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">{c.name}</h3>
                      <div className="text-sm text-slate-400 mb-4">
                        <div className="truncate">{c.email}</div>
                        <div>{c.phone}</div>
                      </div>
                      <div className="flex justify-between items-end border-t border-[#2A3441] pt-4">
                        <div>
                           <div className="text-xs text-slate-500 uppercase">Tickets</div>
                           <div className="text-white font-semibold">{c.tickets}</div>
                        </div>
                        <div className="text-right">
                           <div className="text-xs text-slate-500 uppercase">Revenue</div>
                           <div className="text-white font-semibold">{c.revenue}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW: POINT OF SALE */}
            {activeTab === 'pos' && (
              <div className="animate-in fade-in duration-300 h-full flex flex-col md:flex-row gap-6">
                
                {/* Left Panel: Ticket / Cart */}
                <div className="w-full md:w-80 flex flex-col gap-4">
                   {/* Customer Card */}
                   <div className="bg-[#151E32] border border-[#2A3441] rounded-lg p-4 flex justify-between items-center">
                     <div>
                       <h3 className="text-white font-bold">Walk-in Customer</h3>
                     </div>
                     <div className="flex gap-2">
                       <button className="p-2 bg-[#1F2937] text-slate-400 rounded hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                       <button className="p-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"><User className="w-4 h-4" /></button>
                     </div>
                   </div>

                   {/* Empty Cart State */}
                   <div className="flex-1 bg-[#151E32] border border-[#2A3441] rounded-lg flex flex-col justify-center items-center p-8 text-center min-h-[300px]">
                      <span className="text-slate-500 text-sm">Add repairs or products to the ticket.</span>
                   </div>

                   {/* Totals & Actions */}
                   <div className="bg-[#151E32] border border-[#2A3441] rounded-lg p-4 space-y-3">
                      <div className="flex justify-between text-slate-400 text-sm">
                        <span>Subtotal</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between text-slate-400 text-sm">
                        <span>Tax (10%)</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between text-white font-bold text-lg border-t border-[#2A3441] pt-3">
                        <span>Total</span>
                        <span>$0.00</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                         <button className="bg-[#1F2937] hover:bg-slate-700 text-slate-300 text-xs font-bold py-3 rounded border border-[#374151]">
                           Create Ticket
                         </button>
                         <button className="bg-[#1F2937] hover:bg-slate-700 text-slate-300 text-xs font-bold py-3 rounded border border-[#374151]">
                           Save as Estimate
                         </button>
                         <button className="col-span-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold py-3 rounded">
                           Checkout
                         </button>
                      </div>
                   </div>
                </div>

                {/* Right Panel: Catalog */}
                <div className="flex-1 flex flex-col gap-4">
                   <div className="flex items-center justify-between">
                      <div className="flex-1 h-12 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-900/20">
                        Repair Catalog
                      </div>
                      <div className="ml-4 h-12 px-6 bg-[#151E32] border border-[#2A3441] rounded-lg flex items-center justify-center text-slate-400 font-medium hover:text-white cursor-pointer transition">
                        PC Builder
                      </div>
                   </div>

                   {/* Categories Section */}
                   <div className="flex-1 bg-[#151E32] border border-[#2A3441] rounded-lg p-6">
                      <div className="mb-6">
                        <h3 className="text-white font-semibold mb-4">Categories</h3>
                        <div className="flex gap-2">
                           <div className="relative flex-1">
                              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                              <input 
                                type="text" 
                                placeholder="Search categories..." 
                                className="w-full bg-[#0B1121] border border-[#2A3441] rounded-md py-2.5 pl-10 pr-4 text-slate-300 text-sm focus:outline-none focus:border-brand-500"
                              />
                           </div>
                           <button className="px-4 bg-[#1F2937] border border-[#2A3441] rounded-md text-slate-400 hover:text-white text-sm">Start Over</button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {POS_CATEGORIES.map((cat, idx) => (
                           <div key={idx} className="bg-[#0B1121] border border-[#2A3441] rounded-lg p-5 hover:border-emerald-500/50 cursor-pointer transition group">
                              <div className="w-10 h-10 rounded-lg border border-[#2A3441] flex items-center justify-center mb-4 group-hover:border-emerald-500 text-emerald-500">
                                 <cat.icon className="w-5 h-5" />
                              </div>
                              <h4 className="text-white font-bold text-base mb-1">{cat.name}</h4>
                              <div className="text-xs text-slate-500 mb-2">{cat.mfgs} &bull; Default</div>
                              <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
                           </div>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* VIEW: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="animate-in fade-in duration-300 space-y-6">
                 <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Settings</h2>
                      <p className="text-slate-400 text-sm mt-1">Search and configure your store, staff, inventory, and workflows.</p>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input type="text" placeholder="Search settings..." className="bg-[#151E32] border border-[#2A3441] text-slate-300 rounded pl-10 pr-4 py-2 text-sm w-64 focus:outline-none" />
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SETTINGS_GROUPS.map((group, i) => (
                       <div key={i} className="space-y-4">
                          <div className="mb-2">
                             <h3 className="text-white font-bold text-lg">{group.title}</h3>
                             <p className="text-slate-500 text-xs h-8">{group.desc}</p>
                          </div>
                          <div className="space-y-3">
                             {group.items.map((item, j) => (
                                <div key={j} className="bg-[#151E32] hover:bg-[#1F2937] border border-[#2A3441] p-4 rounded-lg cursor-pointer transition group">
                                   <div className="font-semibold text-slate-200 group-hover:text-white">{item.label}</div>
                                   <div className="text-xs text-slate-500 group-hover:text-slate-400 mt-1">{item.sub}</div>
                                </div>
                             ))}
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
            )}

            {/* VIEW: META BUSINESS */}
            {activeTab === 'meta' && (
              <div className="animate-in fade-in duration-300 flex flex-col items-center justify-center h-full text-center space-y-4 p-12">
                 <div className="w-20 h-20 bg-[#151E32] rounded-full flex items-center justify-center border border-[#2A3441]">
                    <Globe className="w-10 h-10 text-slate-600" />
                 </div>
                 <h2 className="text-xl font-bold text-slate-300">Meta Business</h2>
                 <p className="text-slate-500">No connected pages found. Open Meta Integration settings to configure.</p>
              </div>
            )}

            {/* VIEW: REPORTS */}
            {activeTab === 'reports' && (
              <div className="animate-in fade-in duration-300 space-y-6">
                 <h2 className="text-2xl font-bold text-white">Reports Dashboard</h2>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'TOTAL REVENUE', value: '$0.00' },
                    { label: 'TICKETS COMPLETED', value: '0' },
                    { label: 'NEW CUSTOMERS', value: '4' },
                    { label: 'AVG. TICKET VALUE', value: '$0.00' }
                  ].map((metric, i) => (
                    <div key={i} className="bg-[#151E32] border border-[#2A3441] p-5 rounded-lg">
                      <h4 className="text-xs font-semibold text-slate-400 tracking-wider mb-2">{metric.label}</h4>
                      <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   <div className="lg:col-span-2 bg-[#151E32] border border-[#2A3441] rounded-lg p-6 min-h-[300px]">
                      <h3 className="text-white font-bold mb-6">Sales Revenue (Last 30 Days)</h3>
                      <div className="flex items-center justify-center h-48 border-2 border-dashed border-[#2A3441] rounded">
                         <span className="text-slate-500">No data available for chart</span>
                      </div>
                   </div>
                   <div className="bg-[#151E32] border border-[#2A3441] rounded-lg p-6">
                      <h3 className="text-white font-bold mb-6">Top Selling Services</h3>
                      <div className="space-y-4">
                         <div className="flex justify-between text-sm text-slate-300 pb-2 border-b border-[#2A3441]">
                            <span>iPhone 15 Series - Screen Replacement</span>
                            <span>1 sales</span>
                         </div>
                         <div className="flex justify-between text-sm text-slate-300 pb-2 border-b border-[#2A3441]">
                            <span>NVIDIA GeForce RTX 4090</span>
                            <span>1 sales</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* VIEW: CAMPAIGNER */}
            {activeTab === 'campaigner' && (
               <div className="animate-in fade-in duration-300 flex flex-col items-center justify-center h-full text-center space-y-4 p-12">
                 <div className="w-20 h-20 bg-[#151E32] rounded-full flex items-center justify-center border border-[#2A3441]">
                    <Megaphone className="w-10 h-10 text-slate-600" />
                 </div>
                 <h2 className="text-xl font-bold text-slate-300">Campaigner</h2>
                 <p className="text-slate-500">No campaigns created yet.</p>
                 <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded">New Campaign</button>
              </div>
            )}

            {/* VIEW: EXPENSE */}
            {activeTab === 'expense' && (
               <div className="animate-in fade-in duration-300 flex flex-col items-center justify-center h-full text-center space-y-4 p-12">
                 <div className="w-20 h-20 bg-[#151E32] rounded-full flex items-center justify-center border border-[#2A3441]">
                    <CreditCard className="w-10 h-10 text-slate-600" />
                 </div>
                 <h2 className="text-xl font-bold text-slate-300">Expense Tracking</h2>
                 <p className="text-slate-500">No expenses logged yet.</p>
                 <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded">Add New Expense</button>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};
