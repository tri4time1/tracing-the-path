class TracingPathRibbon extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const root = this.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host { --ribbon-ink:#403a31; --ribbon-glow:#bd7d23; display:block; width:100%; contain:content; }
        .stage { width:100%; overflow:hidden; isolation:isolate; -webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent); mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent); }
        svg { display:block; width:100%; height:auto; }
        .atmosphere { fill:none; stroke:var(--ribbon-glow); stroke-width:18; opacity:.055; filter:blur(8px); }
        .spine { fill:none; stroke:var(--ribbon-ink); stroke-width:.65; opacity:.34; stroke-linecap:round; stroke-linejoin:round; }
        .segment { fill:none; stroke:var(--ribbon-ink); stroke-linecap:round; }
        .energy-current { fill:none; stroke:var(--ribbon-glow); stroke-width:1.1; stroke-linecap:round; stroke-dasharray:2 13 1 21; opacity:.36; filter:url(#glow); animation:current 12s linear infinite; }
        .pulse-halo { fill:none; stroke:var(--ribbon-glow); stroke-width:14; opacity:.14; stroke-linecap:round; filter:blur(5px); }
        .pulse-core { fill:none; stroke:var(--ribbon-glow); stroke-width:3.4; opacity:.76; stroke-linecap:round; filter:url(#glow); }
        .pulse-white { fill:none; stroke:#fff7e8; stroke-width:1.15; opacity:.9; stroke-linecap:round; }
        .date-stream { clip-path:url(#date-reveal); }
        .date-stream text { fill:var(--ribbon-ink); opacity:.52; font:600 10px/1 ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing:.12em; text-anchor:middle; }
        .date-stream circle { fill:var(--ribbon-glow); opacity:.52; }
        @keyframes current { to { stroke-dashoffset:-180; } }
        @media (max-width:640px) { svg { width:145%; transform:translateX(-15.5%); } }
        @media (prefers-reduced-motion:reduce) { * { animation:none !important; } .pulse-halo,.pulse-core,.pulse-white { display:none; } .energy-current { stroke-dasharray:3 16; opacity:.28; } }
      </style>
      <div class="stage" role="img" aria-label="A fine thread of history floating in three-dimensional space with light traveling along it.">
        <svg viewBox="0 0 1200 300" aria-hidden="true">
          <defs>
            <filter id="glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <clipPath id="date-reveal" clipPathUnits="userSpaceOnUse"><path class="date-clip"/></clipPath>
          </defs>
          <g class="date-stream"></g>
          <path class="atmosphere"/><path class="spine"/><g class="depth-segments"></g><path class="energy-current"/>
          <g class="pulse-a"><path class="pulse-halo"/><path class="pulse-core"/><path class="pulse-white"/></g>
          <g class="pulse-b"><path class="pulse-halo"/><path class="pulse-core"/><path class="pulse-white"/></g>
        </svg>
      </div>`;

    const spine = root.querySelector(".spine");
    const atmosphere = root.querySelector(".atmosphere");
    const current = root.querySelector(".energy-current");
    const dateClip = root.querySelector(".date-clip");
    const dateStream = root.querySelector(".date-stream");
    const segmentGroup = root.querySelector(".depth-segments");
    const pulseGroups = [...root.querySelectorAll(".pulse-a, .pulse-b")];
    const pointCount = 58;
    const points = [];
    const restLength = 29.4;
    const leftAnchor = { x:-90, y:156, z:-5 };
    const rightAnchor = { x:1290, y:145, z:10 };
    const dateSpacing = 118;
    const historicalDates = Array.from({ length:28 }, (_, index) => 1760 + index * 10);
    const dateSlots = Array.from({length:14},() => {
      const group=document.createElementNS("http://www.w3.org/2000/svg","g");
      const dot=document.createElementNS("http://www.w3.org/2000/svg","circle");
      const label=document.createElementNS("http://www.w3.org/2000/svg","text");
      dot.setAttribute("cy","150");dot.setAttribute("r","1.4");label.setAttribute("y","153.5");
      group.append(dot,label);dateStream.append(group);return {group,dot,label};
    });

    for (let i=0; i<pointCount; i++) {
      const t = i/(pointCount-1);
      const x = leftAnchor.x+(rightAnchor.x-leftAnchor.x)*t;
      const envelope = Math.sin(Math.PI*t);
      const y = 150+envelope*(46*Math.sin(t*Math.PI*5.2)+20*Math.sin(t*Math.PI*11.1));
      const z = envelope*(54*Math.cos(t*Math.PI*4.1)+22*Math.sin(t*Math.PI*8.7));
      points.push({ x,y,z,px:x-.25,py:y,pz:z });
    }

    const segmentEls = points.slice(1).map(() => {
      const path = document.createElementNS("http://www.w3.org/2000/svg","path");
      path.setAttribute("class","segment"); segmentGroup.append(path); return path;
    });
    // Perspective projection: positive Z approaches the viewer and expands
    // away from the center of the scene; negative Z recedes toward it.
    const project = p => {
      const s=1+p.z/360;
      return { x:600+(p.x-600)*s, y:150+(p.y-150)*s, z:p.z, scale:s };
    };
    const makeCurve = pts => {
      if (pts.length<2) return "";
      let d=`M${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
      for (let i=0; i<pts.length-1; i++) {
        const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)];
        const c1x=p1.x+(p2.x-p0.x)/6,c1y=p1.y+(p2.y-p0.y)/6;
        const c2x=p2.x-(p3.x-p1.x)/6,c2y=p2.y-(p3.y-p1.y)/6;
        d+=` C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
      }
      return d;
    };
    const pulseCurve = (pts,progress,size=9) => {
      const center=progress*(pts.length-1),start=Math.max(0,Math.floor(center-size/2)),end=Math.min(pts.length,Math.ceil(center+size/2));
      return makeCurve(pts.slice(start,end));
    };
    const constrain = () => {
      for (let pass=0; pass<7; pass++) {
        for (let i=0; i<points.length-1; i++) {
          const a=points[i],b=points[i+1],dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z;
          const distance=Math.max(.001,Math.hypot(dx,dy,dz));
          const correction=(distance-restLength)/distance*.48;
          const ax=dx*correction,ay=dy*correction,az=dz*correction;
          if (i!==0) { a.x+=ax;a.y+=ay;a.z+=az; }
          if (i+1!==points.length-1) { b.x-=ax;b.y-=ay;b.z-=az; }
        }
        // A light bending constraint keeps the physical chain from forming
        // angular elbows while still allowing broad loops to change shape.
        for (let i=2; i<points.length-2; i++) {
          const before=points[i-1],p=points[i],after=points[i+1];
          p.x+=((before.x+after.x)*.5-p.x)*.045;
          p.y+=((before.y+after.y)*.5-p.y)*.045;
          p.z+=((before.z+after.z)*.5-p.z)*.045;
        }
        Object.assign(points[0],leftAnchor); Object.assign(points[points.length-1],rightAnchor);
      }
    };
    const simulate = time => {
      for (let i=1; i<points.length-1; i++) {
        const p=points[i],t=i/(points.length-1),envelope=Math.sin(Math.PI*t);
        const vx=(p.x-p.px)*.982,vy=(p.y-p.py)*.982,vz=(p.z-p.pz)*.979;
        p.px=p.x;p.py=p.y;p.pz=p.z;
        const traveling=time*.00105-i*.205,crosswind=time*.00057+i*.31,gust=.55+.45*Math.sin(time*.00019+i*.07);
        p.x+=vx+envelope*(.095*Math.sin(traveling*.7)+.055*Math.cos(crosswind));
        p.y+=vy+envelope*gust*(.23*Math.sin(traveling)+.11*Math.sin(crosswind*1.7));
        p.z+=vz+envelope*gust*(.62*Math.cos(traveling*.83)+.28*Math.sin(crosswind*1.31));
        p.y+=(150-p.y)*.0005;p.z+=-p.z*.0007;
        p.y=Math.max(20,Math.min(280,p.y));p.z=Math.max(-180,Math.min(180,p.z));
      }
      constrain();
    };
    const render = (time=0) => {
      const pts=points.map(project),d=makeCurve(pts);
      spine.setAttribute("d",d);atmosphere.setAttribute("d",d);current.setAttribute("d",d);
      const boundary=[...pts].sort((a,b)=>a.x-b.x);
      let reveal="M-120 -40 L1320 -40";
      for(let i=boundary.length-1;i>=0;i--) reveal+=` L${boundary[i].x.toFixed(2)} ${boundary[i].y.toFixed(2)}`;
      reveal+=" Z";dateClip.setAttribute("d",reveal);

      const dateDistance=time*.012;
      const dateIndex=Math.floor(dateDistance/dateSpacing);
      const dateRemainder=dateDistance%dateSpacing;
      dateSlots.forEach((slot,i) => {
        const logical=i-1;
        const x=logical*dateSpacing-dateRemainder;
        const sequence=((dateIndex+logical)%historicalDates.length+historicalDates.length)%historicalDates.length;
        slot.group.setAttribute("transform",`translate(${x.toFixed(2)} 0)`);
        slot.dot.setAttribute("cx",String(-dateSpacing/2));slot.label.setAttribute("x","0");
        slot.label.textContent=String(historicalDates[sequence]);
      });
      const depthOrder=[];
      segmentEls.forEach((el,i) => {
        const p0=pts[Math.max(0,i-1)],a=pts[i],b=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)];
        const c1x=a.x+(b.x-p0.x)/6,c1y=a.y+(b.y-p0.y)/6;
        const c2x=b.x-(p3.x-a.x)/6,c2y=b.y-(p3.y-a.y)/6;
        const rawDepth=(a.z+b.z)/2;
        const depth=Math.max(-1,Math.min(1,rawDepth/180));
        el.setAttribute("d",`M${a.x.toFixed(2)} ${a.y.toFixed(2)} C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${b.x.toFixed(2)} ${b.y.toFixed(2)}`);
        el.style.strokeWidth=`${(.45+(depth+1)*1.35).toFixed(2)}px`;
        el.style.opacity=`${(.08+(depth+1)*.34).toFixed(2)}`;
        el.style.filter=depth<0?`blur(${(-depth*1.35).toFixed(2)}px)`:"none";
        depthOrder.push({el,depth:rawDepth});
      });
      // Paint distant sections first and near sections last so crossings
      // occlude one another as a real filament would in three dimensions.
      depthOrder.sort((a,b)=>a.depth-b.depth).forEach(item=>segmentGroup.append(item.el));
      const progresses=[(time*.000054)%1,(time*.000054+.5)%1];
      pulseGroups.forEach((group,index) => {
        const pd=pulseCurve(pts,progresses[index]);
        const center=Math.min(pts.length-1,Math.round(progresses[index]*(pts.length-1)));
        const depth=Math.max(-1,Math.min(1,pts[center].z/180));
        group.style.opacity=`${(.36+(depth+1)*.32).toFixed(2)}`;
        group.querySelector(".pulse-halo").style.strokeWidth=`${(8+(depth+1)*5).toFixed(2)}px`;
        group.querySelector(".pulse-core").style.strokeWidth=`${(1.8+(depth+1)*1.5).toFixed(2)}px`;
        group.querySelectorAll("path").forEach(path=>path.setAttribute("d",pd));
      });
    };

    const reduceMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;
    let active=true,frame=null,last=0;
    const tick=time => {
      if (!active) { frame=null;return; }
      const steps=Math.min(3,Math.max(1,Math.round((time-last)/16.7)||1));
      for (let i=0;i<steps;i++) simulate(time-(steps-i-1)*16.7);
      render(time);last=time;frame=requestAnimationFrame(tick);
    };
    render(0);if(!reduceMotion) frame=requestAnimationFrame(tick);
    this._observer=new IntersectionObserver(([entry]) => {
      if(reduceMotion)return;active=entry.isIntersecting;
      if(active&&!frame)frame=requestAnimationFrame(tick);
      if(!active&&frame){cancelAnimationFrame(frame);frame=null;}
    },{threshold:.02});
    this._observer.observe(this);
    this._cleanup=()=>{active=false;if(frame)cancelAnimationFrame(frame);};
  }
  disconnectedCallback(){this._observer?.disconnect();this._cleanup?.();}
}
customElements.define("tracing-path-ribbon",TracingPathRibbon);
