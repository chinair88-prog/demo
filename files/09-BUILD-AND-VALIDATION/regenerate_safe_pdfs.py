from pathlib import Path
import subprocess, re, json, hashlib, csv, concurrent.futures, sys
root=Path('/mnt/data/GTOS-Enterprise-Engineering-Handbook-Final-Edition-1.0')
pdfdir=root/'07-PDF-EDITION'; srcbase=root/'09-BUILD-AND-VALIDATION'/'latex-pdf-sources'; safe= root/'09-BUILD-AND-VALIDATION'/'safe-pdf-sources'; safe.mkdir(parents=True,exist_ok=True)
header=Path('/mnt/data/_gtos_final_stage/pdf_header.tex')
pattern=re.compile(r'(?<![\w])([A-Za-z0-9][A-Za-z0-9_./:-]{14,})(?![\w])')
def add_breaks(t):
    def br(m): return re.sub(r'([_./:-])', lambda x:x.group(1)+'\u200b', m.group(1))
    return pattern.sub(br,t)

# Map PDF to source markdown already built.
jobs=[]
for md in sorted(srcbase.glob('*.md')):
    pdfname=md.stem+'.pdf'
    if pdfname == 'test-volume06.pdf': continue
    jobs.append((pdfname,md))
# stable by numeric prefix
jobs.sort(key=lambda x:x[0])
lo=int(sys.argv[1]) if len(sys.argv)>1 else 0
hi=int(sys.argv[2]) if len(sys.argv)>2 else len(jobs)
jobs=jobs[lo:hi]

def run(job):
    pdfname,md=job
    smd=safe/md.name
    smd.write_text(add_breaks(md.read_text(encoding='utf-8',errors='replace')),encoding='utf-8')
    out=pdfdir/pdfname
    cmd=['pandoc',str(smd),'--from=markdown+raw_tex','--pdf-engine=xelatex','--include-in-header='+str(header),
         '-V','mainfont=DejaVu Sans','-V','monofont=DejaVu Sans Mono','-V','papersize=a4','-V','geometry:margin=1.2cm',
         '-V','fontsize=10pt','-V','colorlinks=true','-V','linkcolor=blue','-V','urlcolor=blue','-V','documentclass=report','-o',str(out)]
    p=subprocess.run(cmd,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE,timeout=1000)
    if p.returncode!=0: raise RuntimeError(p.stderr.decode('utf-8',errors='replace')[-2000:])
    info=subprocess.check_output(['pdfinfo',str(out)],text=True,stderr=subprocess.DEVNULL)
    mm=re.search(r'^Pages:\s+(\d+)',info,re.M); pages=int(mm.group(1)) if mm else None
    return {'file':pdfname,'pages':pages,'bytes':out.stat().st_size,'sha256':hashlib.sha256(out.read_bytes()).hexdigest()}

results=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
    fs={ex.submit(run,j):j[0] for j in jobs}
    for f in concurrent.futures.as_completed(fs):
        try:
            r=f.result(); results.append(r); print(json.dumps(r),flush=True)
        except Exception as e:
            print(json.dumps({'file':fs[f],'error':repr(e)}),flush=True)
print(json.dumps({'range':[lo,hi],'count':len(results)},indent=2))
