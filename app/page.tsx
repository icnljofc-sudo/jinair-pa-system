'use client';

import React, { useState } from 'react';
import { Play, Mic, MonitorSmartphone, AlertTriangle, Clock } from 'lucide-react';

// --- 1. 매뉴얼 데이터베이스 (VER 2.0 기준) ---
// 텍스트 내의 {{편명}}, {{목적지}} 등의 기호가 입력값에 따라 자동으로 변환됩니다.
const MANUAL_DATA = [
  {
    id: 'sec-1',
    icon: <MonitorSmartphone size={18} />,
    title: '1. GATE 보조배터리 안내',
    items: [
      {
        subId: '1-1',
        title: '1-1. GATE 보조배터리 안내 (국문, 영문)',
        blocks: [
          {
            type: 'AI',
            lang: '국문',
            text: '진에어에서 안내 말씀드리겠습니다. 항공기 탑승 후 보조배터리와 전자담배의 사용 및 충전은 금지되며, 또한 기내 선반 보관은 엄격히 금지되어 있습니다. 보조배터리는 160Wh 이하 최대 2개까지 반입 가능하며, 160Wh 초과 시 반입이 불가합니다. 반드시 직접 휴대하시거나 좌석 앞 주머니에 보관해주시고, 단락 방지를 위해 절연테이프를 부착해주시기 바랍니다. 감사합니다.',
            link: 'https://drive.google.com/file/d/구글드라이브링크_국문/view'
          }
        ]
      }
    ]
  },
  {
    id: 'sec-2',
    icon: <Mic size={18} />,
    title: '2. GATE B777 일반 탑승 방송',
    items: [
      {
        subId: '2-1',
        title: '2-1. B777 탑승 10분 전 안내 & 탑승순서안내 (국문)',
        blocks: [
          {
            type: 'VOICE',
            lang: '국문',
            text: 'Fly Better Fly, 진에어에서 안내말씀 드리겠습니다. 유모차 및 수하물 위탁이 필요한 승객께서는 {{게이트}} 탑승구로 나오셔서 전달해주시기 바랍니다.\n\n<정시 탑승> 진에어 LJ {{편명}}편 {{목적지}}행은 {{시간}}부터 탑승을 시작할 예정이며(입니다. 감사합니다) 다음과 같이 탑승 순서에 대해 안내드립니다.\n\n<지연 탑승> 진에어 LJ {{편명}}편 {{목적지}}행은 {{지연사유}}로 인해 탑승이 지연되어, {{시간}}부터 탑승을 시작할 예정이며 다음과 같이 탑승 순서에 대해 안내드립니다.',
          },
          {
            type: 'AI',
            lang: '국문',
            text: '(진에어에서 탑승 순서 안내 말씀 드리겠습니다) 탑승 시에는 24개월 미만 유아 동반자, 노약자 및 임산부 등 직원의 도움이 필요한 승객분들께서 먼저 탑승을 하실 수 있도록 도와드리고 있습니다. 또한 진에어는 원활한 탑승을 위해 Zone Boarding을 실시하고 있습니다. 탑승권상 A ZONE으로 표시되어있는 JINI PLUS좌석인 1열부터 6열, 그리고 D ZONE으로 표시되어있는 51열부터 63열의 승객께서는 먼저 탑승을 할 예정이오니 탑승권에 표시된 ZONE을 확인하시어 탑승을 준비해주시기 바랍니다. 다음으로 C ZONE으로 표시되어 있는 37열부터 50열 승객, 이어서 B ZONE으로 표시되어 있는 28열부터 36열 승객 순으로 탑승할 예정이오니 탑승권에 표시된 ZONE을 확인하시어 탑승을 준비 해주시기 바랍니다. 감사합니다.',
            link: 'https://drive.google.com/file/d/구글드라이브링크_탑승순서_국문/view'
          }
        ]
      },
      {
        subId: '2-3',
        title: '2-3. B777 탑승 직전 안내 & A, D ZONE 탑승 (국문)',
        blocks: [
          {
            type: 'VOICE',
            lang: '국문',
            text: 'Fly Better Fly 진에어에서 안내말씀 드리겠습니다. {{목적지}}로 출발 예정인 진에어 LJ{{편명}}편은 곧 탑승을 시작하오니, 승객께서는 {{게이트}}번 탑승구로 탑승해 주시기 바랍니다.\n\n사전에 인천공항 스마트패스 앱으로 탑승권과 안면 정보를 등록하신 승객께서는 ZONE에 관계없이 탑승구의 스마트패스 전용 라인 쪽으로 탑승해주시기 바랍니다. 등록되지 않은 승객께서는 해당하는 탑승 ZONE의 순서에 탑승을 준비해주시기 바랍니다.\n\n진에어에서는 직원의 도움이 필요한 24개월 미만 유아 동반자, 노약자 및 임산부 등 먼저 탑승을 하실 수 있도록 도와드리고 있습니다. 또한 원활한 탑승을 위해 ZONE BOARDING을 실시하고 있습니다.\n\n탑승권 상 ZONE A로 표시되어있는 1열부터 6열, ZONE D로 표시되어있는 51열부터 63열 승객께서 먼저 탑승해주시고, 이후 ZONE C, ZONE B 순으로 탑승 예정이오니 잠시 대기해주시기 바랍니다.\n\n탑승 전 여권 사진면과 탑승권을 확인을 하고 있습니다. 정확한 신원확인을 위해 착용하신 마스크, 선글라스, 모자 등을 미리 벗어두시어 신원확인에 적극 협조해주시기 바랍니다. 감사합니다.'
          }
        ]
      }
    ]
  },
  {
    id: 'sec-7',
    icon: <AlertTriangle size={18} />,
    title: '7. CNTR 대고객 안내',
    items: [
      {
        subId: '7-1',
        title: '7-1. CNTR 대기 승객 안내 (국문, 영문)',
        blocks: [
          {
            type: 'AI',
            lang: '국문',
            text: '진에어에서 승객 여러분께 안내 말씀드리겠습니다. 빠른 탑승수속을 위해 사전에 여권과 탑승권 또는 E-Ticket 등의 서류를 미리 준비하여 주시기 바랍니다. 또한, 1번 출국장이 매우 혼잡할 수 있으니, 보다 원활한 출국을 위해 2번 출국장을 이용하여 주시기 바랍니다. 탑승수속을 마치신 승객께서는 출국장으로 신속히 이동하여 주시기 바랍니다. 아울러, 항공기 출발 10분 전에는 탑승이 마감되오니, 탑승구로 미리 이동하여 주시기 바랍니다. 감사합니다.',
            link: 'https://drive.google.com/file/d/구글드라이브링크_CNTR대기_국문/view'
          }
        ]
      }
    ]
  }
];

export default function PaSoundboard() {
  const [activeSection, setActiveSection] = useState(MANUAL_DATA[0].id);

  // --- 가변 데이터 상태 관리 ---
  const [flightNum, setFlightNum] = useState('');
  const [dest, setDest] = useState('');
  const [gate, setGate] = useState('');
  const [time, setTime] = useState('');
  const [delayRzn, setDelayRzn] = useState('');

  // 구글 드라이브 새 창 열기 (앱 연결)
  const handlePlayClick = (link?: string) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      alert('연결된 구글 드라이브 링크가 없습니다.');
    }
  };

  // 텍스트 자동 완성 변환 함수
  const formatText = (rawText: string) => {
    return rawText
      .replace(/\{\{편명\}\}/g, flightNum ? flightNum : '( 편명 )')
      .replace(/\{\{목적지\}\}/g, dest ? dest : '( 목적지 )')
      .replace(/\{\{게이트\}\}/g, gate ? gate : '( 탑승구 )')
      .replace(/\{\{시간\}\}/g, time ? time : '00시 00분')
      .replace(/\{\{지연사유\}\}/g, delayRzn ? `[${delayRzn}]` : '[ 지연사유 ]');
  };

  const renderContent = () => {
    const section = MANUAL_DATA.find((s) => s.id === activeSection);
    if (!section) return null;

    return (
      <div className="space-y-8 animate-fade-in">
        <div className="border-b pb-4">
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">{section.title}</h2>
          <p className="text-sm text-gray-500 mt-1">※ 파란색 텍스트는 AI 음성 재생, 검정색 텍스트는 직원 육성 방송입니다.</p>
        </div>

        {section.items.map((item) => (
          <div key={item.subId} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-gray-200 px-5 py-3 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-lg">{item.title}</h3>
            </div>
            <div className="p-5 space-y-6">
              {item.blocks.map((block, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-4">
                  <div className="shrink-0 md:w-32 flex flex-col gap-2">
                    <span className={`inline-block px-3 py-1 text-xs font-extrabold rounded-md text-center border ${
                      block.type === 'AI' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 border-gray-300'
                    }`}>
                      {block.lang} {block.type === 'AI' ? '(AI)' : '(육성)'}
                    </span>
                    {block.type === 'AI' && block.link && (
                      <button
                        onClick={() => handlePlayClick(block.link)}
                        className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-bold transition shadow-sm"
                      >
                        <Play size={14} fill="currentColor" /> 재생
                      </button>
                    )}
                  </div>
                  <div className={`flex-1 p-4 rounded-xl whitespace-pre-wrap leading-relaxed text-base font-medium ${
                    block.type === 'AI' ? 'bg-blue-50/50 text-blue-900 border border-blue-100' : 'bg-gray-50 text-slate-800 border border-gray-200'
                  }`}>
                    {/* 변환 함수를 거쳐서 렌더링 */}
                    {formatText(block.text)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col shrink-0 overflow-y-auto hidden md:flex">
        <div className="p-6">
          <h1 className="text-white text-xl font-black tracking-tight leading-tight">JIN AIR<br/><span className="text-lime-400">PA SYSTEM</span></h1>
          <p className="text-xs text-slate-400 mt-2">CNTR/GATE STANDARD VER 2.0</p>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {MANUAL_DATA.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              {section.icon}
              <span className="truncate">{section.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* 상단 정보 입력 컨트롤 패널 (이 값을 입력하면 대본이 바뀜) */}
        <div className="bg-white border-b border-gray-200 p-4 md:p-6 shadow-sm z-10">
          <div className="max-w-5xl mx-auto flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1 w-20">
              <label className="text-[11px] font-bold text-gray-500">편명</label>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden h-10">
                <span className="bg-gray-100 text-gray-500 font-bold text-xs px-2 flex items-center">LJ</span>
                <input type="text" maxLength={3} value={flightNum} onChange={e => setFlightNum(e.target.value.replace(/[^0-9]/g, ''))} className="w-full px-1 font-bold text-slate-800 text-sm outline-none" placeholder="081" />
              </div>
            </div>
            <div className="flex flex-col gap-1 w-24">
              <label className="text-[11px] font-bold text-gray-500">목적지</label>
              <input type="text" value={dest} onChange={e => setDest(e.target.value)} className="border border-gray-300 rounded-lg px-3 font-bold text-slate-800 text-sm outline-none h-10" placeholder="다낭" />
            </div>
            <div className="flex flex-col gap-1 w-20">
              <label className="text-[11px] font-bold text-gray-500">게이트</label>
              <input type="text" value={gate} onChange={e => setGate(e.target.value)} className="border border-gray-300 rounded-lg px-3 font-bold text-slate-800 text-sm outline-none h-10" placeholder="253" />
            </div>
            <div className="flex flex-col gap-1 w-28">
              <label className="text-[11px] font-bold text-gray-500">시간</label>
              <input type="text" value={time} onChange={e => setTime(e.target.value)} className="border border-gray-300 rounded-lg px-3 font-bold text-slate-800 text-sm outline-none h-10" placeholder="10시 30분" />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
              <label className="text-[11px] font-bold text-red-500">지연 사유 (지연 시에만 입력)</label>
              <select value={delayRzn} onChange={e => setDelayRzn(e.target.value)} className="border border-red-300 bg-red-50 rounded-lg px-3 font-bold text-red-800 text-sm outline-none h-10 cursor-pointer">
                <option value="">(정시 출발 - 선택 안함)</option>
                <option value="항공기 연결관계">항공기 연결관계</option>
                <option value="기내 준비관계">기내 준비관계</option>
                <option value="기상악화">기상악화</option>
                <option value="항공기 점검">항공기 점검</option>
              </select>
            </div>
          </div>
        </div>

        {/* 방송문 스크립트 영역 */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}