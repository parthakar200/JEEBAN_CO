import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API } from '../context/AuthContext';
import { SERVICES_DATA } from '../utils/servicesData';
import toast from 'react-hot-toast';

// ─── Helpers ────────────────────────────────────────────────────────────────

const STATUS_COLORS = {
  new: { bg: '#eff6ff', color: '#1a56db', label: 'New' },
  contacted: { bg: '#fffbeb', color: '#d97706', label: 'Contacted' },
  converted: { bg: '#f0fdf4', color: '#16a34a', label: 'Converted' },
  closed: { bg: '#f8fafc', color: '#64748b', label: 'Closed' },
};

function Badge({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS.new;
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: c.bg, color: c.color, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
      {c.label}
    </span>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#0f172a', margin: 0 }}>{children}</h2>;
}

// ─── Leads Tab ──────────────────────────────────────────────────────────────

function LeadsTab() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [noteText, setNoteText] = useState('');

  const fetchLeads = useCallback(async () => {
    try {
      const res = await API.get('/leads');
      setLeads(res.data.leads || []);
    } catch {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateLead = async (id, updates) => {
    try {
      const res = await API.put(`/leads/${id}`, updates);
      setLeads(prev => prev.map(l => l._id === id ? res.data.lead : l));
      if (selected?._id === id) setSelected(res.data.lead);
      toast.success('Lead updated');
    } catch {
      toast.error('Update failed');
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await API.delete(`/leads/${id}`);
      setLeads(prev => prev.filter(l => l._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Lead deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Loading leads…</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 20 }}>
      {/* Table */}
      <Card>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <SectionTitle>Enquiry Leads <span style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8', marginLeft: 8 }}>({leads.length})</span></SectionTitle>
        </div>
        {leads.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>No leads yet. They'll appear here after customers fill the registration form.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Name', 'Phone', 'Service', 'Message', 'Status', 'Date', ''].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#64748b', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead._id} style={{ borderTop: '1px solid #f1f5f9', cursor: 'pointer', background: selected?._id === lead._id ? '#f8faff' : 'transparent' }}
                    onClick={() => { setSelected(lead); setNoteText(lead.notes || ''); }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: '#0f172a' }}>
                      <div>{lead.name}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 400 }}>{lead.email}</div>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#475569' }}>{lead.phone}</td>
                    <td style={{ padding: '12px 14px', color: '#475569', maxWidth: 160 }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.service || '—'}</div>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#94a3b8', maxWidth: 180 }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.message || '—'}</div>
                    </td>
                    <td style={{ padding: '12px 14px' }}><Badge status={lead.status} /></td>
                    <td style={{ padding: '12px 14px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <button onClick={e => { e.stopPropagation(); deleteLead(lead._id); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 16 }}>🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Detail panel */}
      {selected && (
        <Card style={{ padding: 24, alignSelf: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <SectionTitle>Lead Detail</SectionTitle>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 20 }}>✕</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div><span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>NAME</span><div style={{ fontWeight: 700, marginTop: 2 }}>{selected.name}</div></div>
            <div><span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>EMAIL</span><div style={{ marginTop: 2 }}>{selected.email}</div></div>
            <div><span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>PHONE</span><div style={{ marginTop: 2 }}>+91 {selected.phone}</div></div>
            {selected.service && <div><span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>SERVICE</span><div style={{ marginTop: 2, color: '#1a56db', fontWeight: 600 }}>{selected.service}</div></div>}
            {selected.message && <div><span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>MESSAGE</span><div style={{ marginTop: 4, background: '#f8fafc', borderRadius: 8, padding: '10px 12px', fontSize: 13, lineHeight: 1.6 }}>{selected.message}</div></div>}
            <div>
              <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>STATUS</span>
              <select value={selected.status} onChange={e => updateLead(selected._id, { status: e.target.value, notes: noteText })}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
                {Object.entries(STATUS_COLORS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>ADMIN NOTES</span>
              <textarea value={noteText} onChange={e => setNoteText(e.target.value)} rows={3}
                placeholder="Internal notes…"
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, resize: 'vertical', boxSizing: 'border-box' }} />
              <button onClick={() => updateLead(selected._id, { status: selected.status, notes: noteText })}
                className="btn btn-primary" style={{ marginTop: 8, width: '100%', justifyContent: 'center', padding: '10px', fontSize: 13 }}>
                Save Notes
              </button>
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
              Received: {new Date(selected.createdAt).toLocaleString('en-IN')}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Services Tab ────────────────────────────────────────────────────────────

const EMPTY_SERVICE = {
  id: '', name: '', icon: '📄', category: 'startup', shortDescription: '',
  price: { base: 0, governmentFee: 0 }, timeline: '', isPopular: false,
};

const CATEGORY_OPTIONS = [
  { value: 'startup', label: '🚀 Business Setup' },
  { value: 'gst', label: '📋 GST' },
  { value: 'mca', label: '📁 MCA / ROC' },
  { value: 'income-tax', label: '💰 Income Tax' },
  { value: 'trademark', label: '™️ Trademark' },
  { value: 'payroll', label: '👥 HR & Payroll' },
  { value: 'compliance', label: '✅ Compliance' },
  { value: 'legal', label: '⚖️ Legal' },
];

function ServicesTab() {
  const STORAGE_KEY = 'admin_service_overrides';
  const CUSTOM_KEY  = 'admin_custom_services';
  const DOC_KEY      = 'admin_service_documents';
  const CONTENT_KEY  = 'admin_service_content';

  const loadContentOverrides = () => {
    try { return JSON.parse(localStorage.getItem(CONTENT_KEY)) || {}; } catch { return {}; }
  };
  const [contentOverrides, setContentOverrides] = useState(loadContentOverrides);
  const [editingContent, setEditingContent]     = useState(null); // { serviceId, tab: 'overview'|'process'|'faqs' }
  const [contentDraft, setContentDraft]         = useState(null);

  const saveContentOverrides = (next) => {
    setContentOverrides(next);
    localStorage.setItem(CONTENT_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('admin_service_update'));
  };

  const startEditContent = (s, tab) => {
    const co = contentOverrides[s.id] || {};
    let draft;
    if (tab === 'overview') {
      draft = [...(co.features ?? s.features ?? [])];
    } else if (tab === 'process') {
      draft = (co.process ?? s.process ?? []).map(p => ({ ...p }));
    } else {
      draft = (co.faqs ?? s.faqs ?? [
        { question: `How long does ${s.name} take?`, answer: `Typical timeline: ${s.timeline || '5-7 business days'}.` },
        { question: 'Do you offer refunds?', answer: 'Yes, we have a transparent refund policy.' },
      ]).map(f => ({ ...f }));
    }
    setContentDraft(draft);
    setEditingContent({ serviceId: s.id, tab, serviceName: s.name });
  };

  const saveContentDraft = () => {
    const { serviceId, tab } = editingContent;
    const co = contentOverrides[serviceId] || {};
    let updated;
    if (tab === 'overview') {
      updated = { ...co, features: contentDraft.filter(f => f.trim()) };
    } else if (tab === 'process') {
      updated = { ...co, process: contentDraft.filter(p => p.title?.trim()) };
    } else {
      updated = { ...co, faqs: contentDraft.filter(f => f.question?.trim()) };
    }
    saveContentOverrides({ ...contentOverrides, [serviceId]: updated });
    setEditingContent(null);
    setContentDraft(null);
    toast.success('Content updated on website!');
  };

  const loadDocOverrides = () => {
    try { return JSON.parse(localStorage.getItem(DOC_KEY)) || {}; } catch { return {}; }
  };
  const [docOverrides, setDocOverrides] = useState(loadDocOverrides);
  const [editingDocs, setEditingDocs]   = useState(null); // service id whose docs are being edited
  const [docDraft, setDocDraft]         = useState([]);   // working copy of doc list

  const saveDocOverrides = (next) => {
    setDocOverrides(next);
    localStorage.setItem(DOC_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('admin_service_update'));
  };

  const startEditDocs = (s) => {
    const current = docOverrides[s.id] ?? s.documents ?? [];
    setDocDraft([...current]);
    setEditingDocs(s.id);
  };

  const saveDocDraft = (s) => {
    const cleaned = docDraft.map(d => d.trim()).filter(Boolean);
    saveDocOverrides({ ...docOverrides, [s.id]: cleaned });
    setEditingDocs(null);
    toast.success('Documents updated!');
  };

  const loadOverrides = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  };
  const loadCustom = () => {
    try { return JSON.parse(localStorage.getItem(CUSTOM_KEY)) || []; } catch { return []; }
  };

  const [overrides, setOverrides] = useState(loadOverrides);
  const [customServices, setCustomServices] = useState(loadCustom);
  const [editing, setEditing] = useState(null);
  const [editVals, setEditVals] = useState({ base: '', govt: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSvc, setNewSvc] = useState(EMPTY_SERVICE);

  const saveOverrides = (next) => {
    setOverrides(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('admin_service_update'));
  };

  const saveCustom = (next) => {
    setCustomServices(next);
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('admin_service_update'));
  };

  const getService = (s) => {
    const ov = overrides[s.id] || {};
    const base = ov.base !== undefined ? ov.base : s.price.base;
    const governmentFee = ov.governmentFee !== undefined ? ov.governmentFee : (s.price.governmentFee || 0);
    return {
      ...s,
      price: { ...s.price, base, governmentFee },
      hidden: ov.hidden ?? false,
      priceHidden: ov.priceHidden ?? false,
    };
  };

  const toggleHide = async (s) => {
    const ov = overrides[s.id] || {};
    const newVal = !ov.hidden;

    try {
      // Persist to DB so ALL users see the change immediately
      await API.patch(`/services/slug/${s.slug}`, { isActive: !newVal });
    } catch {
      toast.error('Failed to save \u2014 check server connection');
      return;
    }

    const next = { ...overrides, [s.id]: { ...ov, hidden: newVal } };
    saveOverrides(next);
    toast.success(newVal ? `"${s.name}" hidden from website` : `"${s.name}" is now visible`);
  };

  const togglePriceHide = async (s) => {
    const ov = overrides[s.id] || {};
    const newVal = !ov.priceHidden;

    try {
      await API.patch(`/services/slug/${s.slug}`, { priceHidden: newVal });
    } catch {
      toast.error('Failed to save \u2014 check server connection');
      return;
    }

    const next = { ...overrides, [s.id]: { ...ov, priceHidden: newVal } };
    saveOverrides(next);
    toast.success(newVal ? 'Price hidden \u2014 "Contact us" shown instead' : 'Price visible again');
  };

  const startEdit = (s) => {
    const sv = getService(s);
    setEditing(s.id);
    setEditVals({ base: String(sv.price.base), govt: String(sv.price.governmentFee) });
  };

  const savePrice = async (s) => {
    const base = parseFloat(editVals.base);
    const governmentFee = parseFloat(editVals.govt);
    if (isNaN(base) || base < 0) return toast.error('Enter a valid base price');

    try {
      // Persist price changes to DB so ALL users see updated prices
      await API.patch(`/services/slug/${s.slug}`, {
        'price.base': base,
        'price.governmentFee': isNaN(governmentFee) ? 0 : governmentFee,
      });
    } catch {
      toast.error('Failed to save \u2014 check server connection');
      return;
    }

    const ov = overrides[s.id] || {};
    saveOverrides({ ...overrides, [s.id]: { ...ov, base, governmentFee: isNaN(governmentFee) ? 0 : governmentFee } });
    setEditing(null);
    toast.success('Price updated!');
  };

  const addCustomService = () => {
    if (!newSvc.name.trim()) return toast.error('Service name is required');
    if (!newSvc.price.base && newSvc.price.base !== 0) return toast.error('Enter a base price');
    const id = 'custom_' + Date.now();
    const slug = newSvc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const svc = { ...newSvc, id, slug, rating: 4.5, reviewCount: 0 };
    saveCustom([...customServices, svc]);
    setNewSvc(EMPTY_SERVICE);
    setShowAddForm(false);
    toast.success('New service added to website!');
  };

  const deleteCustom = (id) => {
    if (!window.confirm('Remove this custom service?')) return;
    saveCustom(customServices.filter(s => s.id !== id));
    toast.success('Service removed');
  };

  const allServices = [...SERVICES_DATA, ...customServices];
  const inp = { padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Add new service form */}
      {showAddForm ? (
        <Card style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <SectionTitle>Add New Service</SectionTitle>
            <button onClick={() => setShowAddForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 22 }}>✕</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 5 }}>Service Name *</label>
              <input style={inp} placeholder="e.g. PF Registration" value={newSvc.name}
                onChange={e => setNewSvc({ ...newSvc, name: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 5 }}>Icon (emoji)</label>
              <input style={inp} placeholder="📄" value={newSvc.icon}
                onChange={e => setNewSvc({ ...newSvc, icon: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 5 }}>Category</label>
              <select style={inp} value={newSvc.category}
                onChange={e => setNewSvc({ ...newSvc, category: e.target.value })}>
                {CATEGORY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 5 }}>Timeline</label>
              <input style={inp} placeholder="e.g. 5-7 business days" value={newSvc.timeline}
                onChange={e => setNewSvc({ ...newSvc, timeline: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 5 }}>Base Price (₹) *</label>
              <input style={inp} type="number" placeholder="1999" value={newSvc.price.base || ''}
                onChange={e => setNewSvc({ ...newSvc, price: { ...newSvc.price, base: parseFloat(e.target.value) || 0 } })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 5 }}>Govt Fee (₹)</label>
              <input style={inp} type="number" placeholder="0" value={newSvc.price.governmentFee || ''}
                onChange={e => setNewSvc({ ...newSvc, price: { ...newSvc.price, governmentFee: parseFloat(e.target.value) || 0 } })} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 5 }}>Short Description</label>
              <input style={inp} placeholder="Brief description shown on service cards" value={newSvc.shortDescription}
                onChange={e => setNewSvc({ ...newSvc, shortDescription: e.target.value })} />
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="checkbox" id="isPopular" checked={newSvc.isPopular}
                onChange={e => setNewSvc({ ...newSvc, isPopular: e.target.checked })} />
              <label htmlFor="isPopular" style={{ fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Mark as Popular</label>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button className="btn btn-primary" onClick={addCustomService} style={{ padding: '10px 24px', fontSize: 14 }}>
              + Add Service
            </button>
            <button onClick={() => setShowAddForm(false)}
              style={{ background: '#f1f5f9', border: 'none', borderRadius: 10, padding: '10px 18px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#475569' }}>
              Cancel
            </button>
          </div>
        </Card>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={() => setShowAddForm(true)} style={{ fontSize: 14, padding: '10px 22px' }}>
            + Add New Service
          </button>
        </div>
      )}

      {/* Services table */}
      <Card>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <SectionTitle>All Services <span style={{ fontSize: 13, fontWeight: 400, color: '#94a3b8' }}>({allServices.length} total)</span></SectionTitle>
            <p style={{ fontSize: 12, color: '#94a3b8', margin: '4px 0 0' }}>
              Toggle <strong>Visible</strong> to show/hide a service. Toggle <strong>Price</strong> to show "Contact us" instead of the price.
            </p>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Service', 'Category', 'Base Price', 'Govt Fee', 'Total', 'Visible', 'Price', 'Docs', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#64748b', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allServices.map(s => {
                const sv = getService(s);
                const total = Math.round(sv.price.base + (sv.price.base * 0.18) + (sv.price.governmentFee || 0));
                const isEditing = editing === s.id;
                const isCustom = s.id.startsWith('custom_');
                return (
                  <tr key={s.id} style={{ borderTop: '1px solid #f1f5f9', opacity: sv.hidden ? 0.4 : 1, background: isCustom ? '#fffbeb' : 'transparent' }}>
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 18 }}>{s.icon}</span>
                        <div>
                          <div style={{ fontWeight: 600, color: '#0f172a', fontSize: 13 }}>{s.name}</div>
                          {isCustom && <span style={{ fontSize: 10, background: '#fef3c7', color: '#92400e', padding: '1px 6px', borderRadius: 99, fontWeight: 700 }}>CUSTOM</span>}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '11px 14px', color: '#64748b', textTransform: 'capitalize' }}>{s.category}</td>
                    <td style={{ padding: '11px 14px' }}>
                      {isEditing ? (
                        <input type="number" value={editVals.base} onChange={e => setEditVals({ ...editVals, base: e.target.value })}
                          style={{ width: 80, padding: '4px 8px', border: '1px solid #1a56db', borderRadius: 6, fontSize: 13 }} />
                      ) : (
                        <span style={{ fontWeight: 600, color: sv.priceHidden ? '#94a3b8' : '#0f172a' }}>
                          {sv.priceHidden ? '—' : `₹${sv.price.base.toLocaleString('en-IN')}`}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '11px 14px' }}>
                      {isEditing ? (
                        <input type="number" value={editVals.govt} onChange={e => setEditVals({ ...editVals, govt: e.target.value })}
                          style={{ width: 72, padding: '4px 8px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13 }} />
                      ) : (
                        <span style={{ color: '#64748b' }}>₹{(sv.price.governmentFee || 0).toLocaleString('en-IN')}</span>
                      )}
                    </td>
                    <td style={{ padding: '11px 14px', fontWeight: 700, color: sv.priceHidden ? '#94a3b8' : '#1a56db' }}>
                      {sv.priceHidden ? 'Hidden' : `₹${total.toLocaleString('en-IN')}`}
                    </td>
                    {/* Visible toggle */}
                    <td style={{ padding: '11px 14px' }}>
                      <button onClick={() => toggleHide(s)}
                        style={{ background: sv.hidden ? '#fef2f2' : '#f0fdf4', border: 'none', borderRadius: 20, padding: '4px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: sv.hidden ? '#ef4444' : '#16a34a' }}>
                        {sv.hidden ? '✗ Hidden' : '✓ Shown'}
                      </button>
                    </td>
                    {/* Price toggle */}
                    <td style={{ padding: '11px 14px' }}>
                      <button onClick={() => togglePriceHide(s)}
                        style={{ background: sv.priceHidden ? '#fff7ed' : '#f0f9ff', border: 'none', borderRadius: 20, padding: '4px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: sv.priceHidden ? '#ea580c' : '#0284c7' }}>
                        {sv.priceHidden ? '👁 Hidden' : '₹ Shown'}
                      </button>
                    </td>
                    {/* Docs + Content */}
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <button onClick={() => startEditDocs(s)}
                          style={{ background: '#f0f9ff', border: 'none', borderRadius: 6, padding: '3px 8px', cursor: 'pointer', fontSize: 11, fontWeight: 600, color: '#0284c7', whiteSpace: 'nowrap' }}>
                          📄 Docs ({(docOverrides[s.id] ?? s.documents ?? []).length})
                        </button>
                        <button onClick={() => startEditContent(s, 'overview')}
                          style={{ background: '#f0fdf4', border: 'none', borderRadius: 6, padding: '3px 8px', cursor: 'pointer', fontSize: 11, fontWeight: 600, color: '#16a34a', whiteSpace: 'nowrap' }}>
                          ✅ Overview
                        </button>
                        <button onClick={() => startEditContent(s, 'process')}
                          style={{ background: '#fffbeb', border: 'none', borderRadius: 6, padding: '3px 8px', cursor: 'pointer', fontSize: 11, fontWeight: 600, color: '#d97706', whiteSpace: 'nowrap' }}>
                          🔢 Process
                        </button>
                        <button onClick={() => startEditContent(s, 'faqs')}
                          style={{ background: '#faf5ff', border: 'none', borderRadius: 6, padding: '3px 8px', cursor: 'pointer', fontSize: 11, fontWeight: 600, color: '#7c3aed', whiteSpace: 'nowrap' }}>
                          ❓ FAQs
                        </button>
                      </div>
                    </td>
                    {/* Actions */}
                    <td style={{ padding: '11px 14px' }}>
                      {isEditing ? (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button onClick={() => savePrice(s)} className="btn btn-primary" style={{ padding: '4px 10px', fontSize: 12 }}>Save</button>
                          <button onClick={() => setEditing(null)} style={{ background: '#f1f5f9', border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', fontSize: 12 }}>✕</button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button onClick={() => startEdit(s)}
                            style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '4px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#475569' }}>
                            ✏️ Price
                          </button>
                          {isCustom && (
                            <button onClick={() => deleteCustom(s.id)}
                              style={{ background: '#fef2f2', border: 'none', borderRadius: 8, padding: '4px 8px', cursor: 'pointer', fontSize: 13 }}>
                              🗑
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Document editor modal */}
      {editingDocs && (
        <DocsEditor
          svc={allServices.find(s => s.id === editingDocs)}
          docDraft={docDraft}
          setDocDraft={setDocDraft}
          onSave={saveDocDraft}
          onClose={() => setEditingDocs(null)}
        />
      )}

      {/* Content editor modal */}
      {editingContent && contentDraft && (
        <ContentEditor
          editingContent={editingContent}
          contentDraft={contentDraft}
          setContentDraft={setContentDraft}
          onSave={saveContentDraft}
          onClose={() => { setEditingContent(null); setContentDraft(null); }}
        />
      )}
    </div>
  );
}

// ─── DocsEditor sub-component ─────────────────────────────────────────────────
function DocsEditor({ svc, docDraft, setDocDraft, onSave, onClose }) {
  if (!svc || !docDraft) return null;
  return (
    <Card style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <SectionTitle>Edit Required Documents — {svc.name}</SectionTitle>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 22 }}>✕</button>
      </div>
      <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>One document per line. Changes reflect immediately on the service page.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {docDraft.map((doc, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input value={doc} onChange={e => { const d = [...docDraft]; d[i] = e.target.value; setDocDraft(d); }}
              style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14 }}
              placeholder={"Document " + (i + 1)} />
            <button onClick={() => setDocDraft(docDraft.filter((_, j) => j !== i))}
              style={{ background: '#fef2f2', border: 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', color: '#ef4444', fontWeight: 700, fontSize: 15 }}>✕</button>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setDocDraft([...docDraft, ''])}
          style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '9px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#475569' }}>
          + Add Document
        </button>
        <button className="btn btn-primary" onClick={() => onSave(svc)} style={{ padding: '9px 20px', fontSize: 13 }}>
          Save Changes
        </button>
        <button onClick={onClose}
          style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '9px 14px', cursor: 'pointer', fontSize: 13, color: '#64748b' }}>
          Cancel
        </button>
      </div>
    </Card>
  );
}

// ─── ContentEditor sub-component ──────────────────────────────────────────────
function ContentEditor({ editingContent, contentDraft, setContentDraft, onSave, onClose }) {
  const { tab, serviceName } = editingContent;
  const inp = { padding: '7px 10px', border: '1px solid #e2e8f0', borderRadius: 7, fontSize: 13, width: '100%', boxSizing: 'border-box' };
  return (
    <Card style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <SectionTitle>
          {tab === 'overview' ? 'Edit Overview Features' : tab === 'process' ? 'Edit Process Steps' : 'Edit FAQs'} — {serviceName}
        </SectionTitle>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 22 }}>✕</button>
      </div>

      {tab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 8px' }}>Each line = one feature bullet shown in the Overview tab.</p>
          {contentDraft.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8 }}>
              <input value={item} onChange={e => { const d=[...contentDraft]; d[i]=e.target.value; setContentDraft(d); }}
                style={inp} placeholder={"Feature " + (i+1)} />
              <button onClick={() => setContentDraft(contentDraft.filter((_,j)=>j!==i))}
                style={{ background:'#fef2f2',border:'none',borderRadius:7,padding:'7px 10px',cursor:'pointer',color:'#ef4444',fontWeight:700 }}>✕</button>
            </div>
          ))}
          <button onClick={() => setContentDraft([...contentDraft, ''])}
            style={{ alignSelf:'flex-start',background:'#f1f5f9',border:'none',borderRadius:7,padding:'7px 14px',cursor:'pointer',fontSize:13,fontWeight:600,color:'#475569' }}>
            + Add Feature
          </button>
        </div>
      )}

      {tab === 'process' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 14 }}>
          <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 4px' }}>Each step has a title and description shown in the Process tab.</p>
          {contentDraft.map((step, i) => (
            <div key={i} style={{ background:'#f8fafc',borderRadius:10,padding:14,display:'flex',flexDirection:'column',gap:8 }}>
              <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                <span style={{ width:28,height:28,borderRadius:'50%',background:'#1a56db',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:800,flexShrink:0 }}>{i+1}</span>
                <input value={step.title||''} onChange={e=>{const d=[...contentDraft];d[i]={...d[i],title:e.target.value,step:i+1};setContentDraft(d);}}
                  style={Object.assign({},inp,{fontWeight:600})} placeholder="Step title" />
                <button onClick={() => setContentDraft(contentDraft.filter((_,j)=>j!==i))}
                  style={{ background:'#fef2f2',border:'none',borderRadius:7,padding:'6px 10px',cursor:'pointer',color:'#ef4444',fontWeight:700,flexShrink:0 }}>✕</button>
              </div>
              <textarea value={step.description||''} onChange={e=>{const d=[...contentDraft];d[i]={...d[i],description:e.target.value};setContentDraft(d);}}
                style={Object.assign({},inp,{resize:'vertical',minHeight:60})} placeholder="Step description" rows={2} />
            </div>
          ))}
          <button onClick={() => setContentDraft([...contentDraft, { step: contentDraft.length+1, title:'', description:'' }])}
            style={{ alignSelf:'flex-start',background:'#f1f5f9',border:'none',borderRadius:7,padding:'7px 14px',cursor:'pointer',fontSize:13,fontWeight:600,color:'#475569' }}>
            + Add Step
          </button>
        </div>
      )}

      {tab === 'faqs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 14 }}>
          <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 4px' }}>Each FAQ has a question and answer shown in the FAQs tab.</p>
          {contentDraft.map((faq, i) => (
            <div key={i} style={{ background:'#f8fafc',borderRadius:10,padding:14,display:'flex',flexDirection:'column',gap:8 }}>
              <div style={{ display:'flex',gap:8 }}>
                <input value={faq.question||''} onChange={e=>{const d=[...contentDraft];d[i]={...d[i],question:e.target.value};setContentDraft(d);}}
                  style={Object.assign({},inp,{flex:1,fontWeight:600})} placeholder="Question" />
                <button onClick={() => setContentDraft(contentDraft.filter((_,j)=>j!==i))}
                  style={{ background:'#fef2f2',border:'none',borderRadius:7,padding:'6px 10px',cursor:'pointer',color:'#ef4444',fontWeight:700 }}>✕</button>
              </div>
              <textarea value={faq.answer||''} onChange={e=>{const d=[...contentDraft];d[i]={...d[i],answer:e.target.value};setContentDraft(d);}}
                style={Object.assign({},inp,{resize:'vertical',minHeight:70})} placeholder="Answer" rows={2} />
            </div>
          ))}
          <button onClick={() => setContentDraft([...contentDraft, { question:'', answer:'' }])}
            style={{ alignSelf:'flex-start',background:'#f1f5f9',border:'none',borderRadius:7,padding:'7px 14px',cursor:'pointer',fontSize:13,fontWeight:600,color:'#475569' }}>
            + Add FAQ
          </button>
        </div>
      )}

      <div style={{ display:'flex',gap:10,marginTop:4 }}>
        <button className="btn btn-primary" onClick={onSave} style={{ padding:'9px 22px',fontSize:13 }}>Save to Website</button>
        <button onClick={onClose}
          style={{ background:'#f1f5f9',border:'none',borderRadius:8,padding:'9px 16px',cursor:'pointer',fontSize:13,color:'#64748b',fontWeight:600 }}>Cancel</button>
      </div>
    </Card>
  );
}


// ─── Team Tab ────────────────────────────────────────────────────────────────

const EMPTY_MEMBER = { name: '', role: '', email: '', phone: '', bio: '', avatar: '' };

function TeamTab() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_MEMBER);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchMembers = useCallback(async () => {
    try {
      const res = await API.get('/team/all');
      setMembers(res.data.members || []);
    } catch {
      toast.error('Failed to load team');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const resetForm = () => { setForm(EMPTY_MEMBER); setEditId(null); setShowForm(false); };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.role.trim()) return toast.error('Name and role are required');
    setSaving(true);
    try {
      if (editId) {
        const res = await API.put(`/team/${editId}`, form);
        setMembers(prev => prev.map(m => m._id === editId ? res.data.member : m));
        toast.success('Member updated');
      } else {
        const res = await API.post('/team', form);
        setMembers(prev => [...prev, res.data.member]);
        toast.success('Team member added!');
      }
      resetForm();
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (m) => {
    try {
      const res = await API.put(`/team/${m._id}`, { isActive: !m.isActive });
      setMembers(prev => prev.map(x => x._id === m._id ? res.data.member : x));
      toast.success(m.isActive ? 'Member hidden' : 'Member shown');
    } catch { toast.error('Failed'); }
  };

  const togglePin = async (m) => {
    const pinned = members.filter(x => x.isPinned && x._id !== m._id);
    if (!m.isPinned && pinned.length >= 2) {
      toast.error('Only 2 members can be pinned at the top. Unpin one first.');
      return;
    }
    try {
      const res = await API.put(`/team/${m._id}`, { isPinned: !m.isPinned });
      setMembers(prev => prev.map(x => x._id === m._id ? res.data.member : x));
      toast.success(!m.isPinned ? '📌 Pinned to top section' : 'Unpinned from top section');
    } catch { toast.error('Failed'); }
  };

  const deleteMember = async (id) => {
    if (!window.confirm('Delete this team member?')) return;
    try {
      await API.delete(`/team/${id}`);
      setMembers(prev => prev.filter(m => m._id !== id));
      toast.success('Deleted');
    } catch { toast.error('Delete failed'); }
  };

  const startEdit = (m) => {
    setForm({ name: m.name, role: m.role, email: m.email || '', phone: m.phone || '', bio: m.bio || '', avatar: m.avatar || '' });
    setEditId(m._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Loading team…</div>;

  const inputStyle = { display: 'block', width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14, boxSizing: 'border-box', outline: 'none' };
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 5 };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Add / Edit Form */}
      {showForm ? (
        <Card style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <SectionTitle>{editId ? 'Edit Team Member' : 'Add Team Member'}</SectionTitle>
            <button onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 22 }}>✕</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input style={inputStyle} placeholder="e.g. Jeeban Patra" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Role / Designation *</label>
              <input style={inputStyle} placeholder="e.g. Senior CA" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} type="email" placeholder="team@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input style={inputStyle} placeholder="+91 9876543210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Profile Photo</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {/* Preview */}
                <div style={{ width: 80, height: 80, borderRadius: 14, overflow: 'hidden', background: 'linear-gradient(135deg,#1a56db,#7c3aed)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 28, fontWeight: 800 }}>
                  {form.avatar
                    ? <img src={form.avatar} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : (form.name ? form.name.charAt(0).toUpperCase() : '?')}
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'inline-block', padding: '9px 18px', background: '#f1f5f9', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#475569', border: '1px dashed #cbd5e1' }}>
                    📷 Upload Photo
                    <input type="file" accept="image/*" style={{ display: 'none' }}
                      onChange={e => {
                        const file = e.target.files[0];
                        if (!file) return;
                        if (file.size > 2 * 1024 * 1024) { alert('Photo must be under 2MB'); return; }
                        const reader = new FileReader();
                        reader.onload = ev => setForm(f => ({ ...f, avatar: ev.target.result }));
                        reader.readAsDataURL(file);
                      }} />
                  </label>
                  <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 6 }}>JPG, PNG — max 2MB. Photo fills the team card on the website.</p>
                  {form.avatar && (
                    <button onClick={() => setForm(f => ({ ...f, avatar: '' }))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 12, fontWeight: 600, padding: 0, marginTop: 4 }}>
                      ✕ Remove photo
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Bio / About</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }} placeholder="Brief description about this team member..." value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={saving} style={{ padding: '11px 28px', fontSize: 14, opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving…' : editId ? 'Update Member' : 'Add Member'}
            </button>
            <button onClick={resetForm} style={{ background: '#f1f5f9', border: 'none', borderRadius: 10, padding: '11px 20px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#475569' }}>Cancel</button>
          </div>
        </Card>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ fontSize: 14, padding: '10px 22px' }}>+ Add Team Member</button>
        </div>
      )}

      {/* Members grid */}
      {members.length === 0 ? (
        <Card style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>👥</div>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>No team members yet. Add your first member above.</p>
        </Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {members.map(m => (
            <Card key={m._id} style={{ padding: 20, opacity: m.isActive ? 1 : 0.55 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#1a56db,#7c3aed)', color: 'white', fontSize: 20, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', flexShrink: 0, overflow: 'hidden' }}>
                  {m.avatar
                    ? <img src={m.avatar} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : m.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 15 }}>{m.name}</div>
                  <div style={{ fontSize: 13, color: '#1a56db', fontWeight: 500 }}>{m.role}</div>
                </div>
              </div>
              {m.bio && <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, margin: '0 0 10px' }}>{m.bio}</p>}
              {m.email && <div style={{ fontSize: 12, color: '#94a3b8' }}>✉️ {m.email}</div>}
              {m.phone && <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>📞 {m.phone}</div>}
              {/* Pin badge */}
              {m.isPinned && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 99, padding: '2px 10px', fontSize: 11, fontWeight: 700, color: '#d97706', marginTop: 10 }}>
                  📌 Pinned to top
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button onClick={() => startEdit(m)} style={{ flex: 1, background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '7px', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#475569' }}>✏️ Edit</button>
                <button onClick={() => togglePin(m)}
                  style={{ flex: 1, background: m.isPinned ? '#fffbeb' : '#f5f3ff', border: 'none', borderRadius: 8, padding: '7px', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: m.isPinned ? '#d97706' : '#7c3aed' }}>
                  {m.isPinned ? '📌 Unpin' : '📌 Pin top'}
                </button>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button onClick={() => toggleActive(m)} style={{ flex: 1, background: m.isActive ? '#fffbeb' : '#f0fdf4', border: 'none', borderRadius: 8, padding: '7px', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: m.isActive ? '#d97706' : '#16a34a' }}>
                  {m.isActive ? '🙈 Hide' : '👁 Show'}
                </button>
                <button onClick={() => deleteMember(m._id)} style={{ background: '#fef2f2', border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', fontSize: 14 }}>🗑</button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


// ─── Messages Tab ────────────────────────────────────────────────────────────

const MSG_COLORS = {
  unread:  { bg: '#eff6ff', color: '#1a56db', label: 'Unread' },
  read:    { bg: '#f8fafc', color: '#64748b', label: 'Read' },
  replied: { bg: '#f0fdf4', color: '#16a34a', label: 'Replied' },
};

function MessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  const [noteText, setNoteText] = useState('');

  const fetchMessages = useCallback(async () => {
    try {
      const res = await API.get('/contact');
      setMessages(res.data.messages || []);
    } catch { toast.error('Failed to load messages'); }
    finally  { setLoading(false); }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const updateMsg = async (id, updates) => {
    try {
      const res = await API.put(`/contact/${id}`, updates);
      setMessages(prev => prev.map(m => m._id === id ? res.data.message : m));
      if (selected?._id === id) setSelected(res.data.message);
      toast.success('Updated');
    } catch { toast.error('Update failed'); }
  };

  const deleteMsg = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await API.delete(`/contact/${id}`);
      setMessages(prev => prev.filter(m => m._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Deleted');
    } catch { toast.error('Delete failed'); }
  };

  // Mark as read when selected
  const selectMsg = (m) => {
    setSelected(m);
    setNoteText(m.notes || '');
    if (m.status === 'unread') updateMsg(m._id, { status: 'read', notes: m.notes || '' });
  };

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Loading messages…</div>;

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 20 }}>
      <Card>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 12 }}>
          <SectionTitle>Contact Messages</SectionTitle>
          {unreadCount > 0 && (
            <span style={{ background: '#ef4444', color: 'white', fontSize: 11, fontWeight: 800, borderRadius: 99, padding: '2px 8px' }}>
              {unreadCount} new
            </span>
          )}
        </div>
        {messages.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#94a3b8' }}>
            No messages yet. They appear here when someone submits the Contact Us form.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Name', 'Email', 'Service', 'Message Preview', 'Status', 'Date', ''].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#64748b', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {messages.map(m => {
                  const sc = MSG_COLORS[m.status] || MSG_COLORS.read;
                  return (
                    <tr key={m._id}
                      onClick={() => selectMsg(m)}
                      style={{ borderTop: '1px solid #f1f5f9', cursor: 'pointer', background: selected?._id === m._id ? '#f8faff' : m.status === 'unread' ? '#fefce8' : 'transparent' }}>
                      <td style={{ padding: '12px 14px', fontWeight: m.status === 'unread' ? 700 : 500, color: '#0f172a' }}>{m.name}</td>
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{m.email}</td>
                      <td style={{ padding: '12px 14px', color: '#64748b', maxWidth: 120 }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.service || '—'}</div>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#94a3b8', maxWidth: 200 }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.message}</div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: sc.bg, color: sc.color }}>{sc.label}</span>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                        {new Date(m.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <button onClick={e => { e.stopPropagation(); deleteMsg(m._id); }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 16 }}>🗑</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {selected && (
        <Card style={{ padding: 24, alignSelf: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <SectionTitle>Message Detail</SectionTitle>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 20 }}>✕</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div><span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>FROM</span>
              <div style={{ fontWeight: 700, marginTop: 2 }}>{selected.name}</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>{selected.email}</div>
              {selected.phone && <div style={{ fontSize: 13, color: '#64748b' }}>📞 {selected.phone}</div>}
            </div>
            {selected.service && <div><span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>SERVICE</span><div style={{ color: '#1a56db', fontWeight: 600, marginTop: 2 }}>{selected.service}</div></div>}
            <div><span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>MESSAGE</span>
              <div style={{ marginTop: 6, background: '#f8fafc', borderRadius: 8, padding: '12px 14px', fontSize: 13, lineHeight: 1.7, color: '#0f172a' }}>{selected.message}</div>
            </div>
            <div>
              <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>STATUS</span>
              <select value={selected.status} onChange={e => updateMsg(selected._id, { status: e.target.value, notes: noteText })}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
                {Object.entries(MSG_COLORS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>NOTES</span>
              <textarea value={noteText} onChange={e => setNoteText(e.target.value)} rows={3}
                placeholder="Internal notes…"
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, resize: 'vertical', boxSizing: 'border-box' }} />
              <button onClick={() => updateMsg(selected._id, { status: selected.status, notes: noteText })}
                className="btn btn-primary" style={{ marginTop: 8, width: '100%', justifyContent: 'center', padding: '10px', fontSize: 13 }}>
                Save Notes
              </button>
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>Received: {new Date(selected.createdAt).toLocaleString('en-IN')}</div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Main Admin Dashboard ────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('leads');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (user.role !== 'admin') { navigate('/dashboard'); toast.error('Admin access only'); }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;

  const TABS = [
    { id: 'messages', label: '✉️ Messages' },
    { id: 'leads', label: '📋 Enquiry Leads' },
    { id: 'services', label: '⚙️ Manage Services' },
    { id: 'team', label: '👥 Team Members' },
  ];

  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh', background: '#f8fafc' }}>
      <div className="container" style={{ padding: '32px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#1a56db,#7c3aed)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🛡️</div>
            <div>
              <h1 style={{ fontSize: 26, fontFamily: 'var(--font-heading)', fontWeight: 800, margin: 0 }}>Admin Dashboard</h1>
              <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>Welcome back, {user.name}</p>
            </div>
          </div>
        </div>

        {/* Tab nav */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: 6, width: 'fit-content' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ background: tab === t.id ? '#1a56db' : 'transparent', color: tab === t.id ? 'white' : '#64748b', border: 'none', borderRadius: 8, padding: '9px 20px', cursor: 'pointer', fontSize: 14, fontWeight: 600, transition: 'all 0.15s' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'messages' && <MessagesTab />}
        {tab === 'leads' && <LeadsTab />}
        {tab === 'services' && <ServicesTab />}
        {tab === 'team' && <TeamTab />}
      </div>
    </div>
  );
}