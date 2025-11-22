'use client';

import React, { useState } from 'react';

type FormData = {
  title: string;
  organization: string;
  contactName: string;
  contactEmail: string;
  summary: string;
  objectives: string;
  baselineEmissionsTCO2e: string;
  targetReductionPercent: string;
  timeline: string;
  measures: string;
  budget: string;
  benefits: string;
  risks: string;
  kpis: string;
};

const initialData: FormData = {
  title: 'Carbon Footprint Reduction Initiative',
  organization: '',
  contactName: '',
  contactEmail: '',
  summary:
    'This project aims to reduce the organization?s greenhouse gas emissions through targeted efficiency measures and renewable energy adoption.',
  objectives:
    '- Reduce Scope 2 emissions via renewable energy procurement\n- Improve energy efficiency in facilities and operations\n- Engage employees to drive low-carbon behaviors',
  baselineEmissionsTCO2e: '',
  targetReductionPercent: '30',
  timeline: 'Q1 2025 ? Q4 2027',
  measures:
    '- LED lighting retrofit across all sites\n- HVAC optimization & smart controls\n- Server workload consolidation & cloud efficiency\n- Renewable electricity procurement (PPA/RECs)\n- Employee commuting program (EV, public transit, cycling)',
  budget: '?500,000 total across 3 years',
  benefits:
    '- Emissions reduction and progress toward net-zero targets\n- Energy cost savings and reduced volatility\n- Improved ESG ratings and stakeholder trust',
  risks:
    '- Implementation delays due to supply constraints\n- Behavior change adoption lag\n- Regulatory or incentive scheme changes',
  kpis:
    '- Year-over-year tCO2e reduction\n- Energy consumption (kWh) per m?\n- % renewable electricity\n- Employee commute emissions per FTE',
};

export default function HomePage() {
  const [data, setData] = useState<FormData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData(prev => ({ ...prev, [field]: e.target.value }));

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to generate PDF');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'carbon-footprint-project.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      setError(e?.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const Field = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );

  return (
    <main>
      <h1 className="text-3xl font-bold mb-2">Project to Reduce Carbon Footprint</h1>
      <p className="text-gray-600 mb-8">
        Fill the details below and generate a professional PDF proposal.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Project Title">
          <input value={data.title} onChange={update('title')} className="w-full rounded border p-2" />
        </Field>
        <Field label="Organization">
          <input value={data.organization} onChange={update('organization')} className="w-full rounded border p-2" />
        </Field>
        <Field label="Contact Name">
          <input value={data.contactName} onChange={update('contactName')} className="w-full rounded border p-2" />
        </Field>
        <Field label="Contact Email">
          <input value={data.contactEmail} onChange={update('contactEmail')} className="w-full rounded border p-2" />
        </Field>

        <div className="md:col-span-2">
          <Field label="Executive Summary">
            <textarea value={data.summary} onChange={update('summary')} rows={4} className="w-full rounded border p-2" />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Objectives (one per line)">
            <textarea value={data.objectives} onChange={update('objectives')} rows={4} className="w-full rounded border p-2" />
          </Field>
        </div>
        <Field label="Baseline Emissions (tCO2e)">
          <input value={data.baselineEmissionsTCO2e} onChange={update('baselineEmissionsTCO2e')} className="w-full rounded border p-2" />
        </Field>
        <Field label="Target Reduction (%)">
          <input value={data.targetReductionPercent} onChange={update('targetReductionPercent')} className="w-full rounded border p-2" />
        </Field>
        <Field label="Timeline">
          <input value={data.timeline} onChange={update('timeline')} className="w-full rounded border p-2" />
        </Field>
        <div className="md:col-span-2">
          <Field label="Measures (one per line)">
            <textarea value={data.measures} onChange={update('measures')} rows={4} className="w-full rounded border p-2" />
          </Field>
        </div>
        <Field label="Budget">
          <input value={data.budget} onChange={update('budget')} className="w-full rounded border p-2" />
        </Field>
        <div className="md:col-span-2">
          <Field label="Benefits">
            <textarea value={data.benefits} onChange={update('benefits')} rows={3} className="w-full rounded border p-2" />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="Risks & Mitigations">
            <textarea value={data.risks} onChange={update('risks')} rows={3} className="w-full rounded border p-2" />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field label="KPIs (one per line)">
            <textarea value={data.kpis} onChange={update('kpis')} rows={3} className="w-full rounded border p-2" />
          </Field>
        </div>
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      <div className="mt-8">
        <button
          onClick={generate}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 disabled:opacity-60"
        >
          {loading ? 'Generating?' : 'Generate PDF'}
        </button>
      </div>
    </main>
  );
}

