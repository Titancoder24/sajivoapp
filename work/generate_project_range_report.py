from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle

OUT = Path('output/pdf/Project Range Limiter and Budget Estimation System.pdf')
OUT.parent.mkdir(parents=True, exist_ok=True)
s = getSampleStyleSheet()
s.add(ParagraphStyle(name='titlex', parent=s['Title'], fontName='Helvetica-Bold', fontSize=25, leading=30, textColor=colors.HexColor('#202b29'), spaceAfter=16))
s.add(ParagraphStyle(name='h1x', parent=s['Heading1'], fontName='Helvetica-Bold', fontSize=18, leading=22, textColor=colors.HexColor('#202b29'), spaceAfter=9))
s.add(ParagraphStyle(name='h2x', parent=s['Heading2'], fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=colors.HexColor('#b74731'), spaceBefore=7, spaceAfter=5))
s.add(ParagraphStyle(name='bodyx', parent=s['BodyText'], fontName='Helvetica', fontSize=9.2, leading=13.5, textColor=colors.HexColor('#343a36'), spaceAfter=7))
s.add(ParagraphStyle(name='smallx', parent=s['BodyText'], fontName='Helvetica', fontSize=7.8, leading=10.5, textColor=colors.HexColor('#626861'), spaceAfter=3))
s.add(ParagraphStyle(name='calloutx', parent=s['BodyText'], fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=colors.HexColor('#202b29'), backColor=colors.HexColor('#fff0eb'), borderColor=colors.HexColor('#d35f45'), borderWidth=.5, borderPadding=7, spaceBefore=5, spaceAfter=9))

def p(text, style='bodyx'): return Paragraph(text, s[style])
def bullets(items): return [p('• '+x) for x in items]
def tbl(rows, widths):
    t=Table([[p(str(x),'smallx') for x in row] for row in rows], colWidths=widths, repeatRows=1)
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#202b29')),('TEXTCOLOR',(0,0),(-1,0),colors.white),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,colors.HexColor('#f3f4f0')]),('GRID',(0,0),(-1,-1),.3,colors.HexColor('#d9dbd5')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),6),('RIGHTPADDING',(0,0),(-1,-1),6),('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5)]))
    return t

story=[p('Project Range Limiter & Budget Estimation System','titlex'),p('Sajivo implementation report','h2x'),Spacer(1,20),p('A production-oriented implementation of the transparent project budget estimator described in the supplied reference specification.'),Spacer(1,25),tbl([['Area','Implemented result'],['Client planning','Structured inputs with instant minimum-maximum recalculation'],['Estimator','Location, quality, material, scope, services, timeline, and budget factors'],['Marketplace','Quote range signal and out-of-range justification'],['Data','Supabase migration, RLS policies, indexes, and rate versioning'],['Operations','Vercel target and self-hosted Nginx configuration']],[1.45*inch,4.5*inch]),PageBreak()]

def section(title, subtitle, blocks, note=None):
    story.append(p(title,'h1x')); story.append(p(subtitle,'smallx'))
    for b in blocks:
        if isinstance(b,str): story.append(p(b))
        elif isinstance(b,list): story.extend(bullets(b))
        else: story.append(b)
    if note: story.append(p(note,'calloutx'))
    story.append(PageBreak())

section('1. Product scope','What the supplied PDF requires',[
    'Sajivo now has a dedicated estimator before marketplace matching. A homeowner describes a structured project and receives a realistic minimum-maximum planning range. The result is not a fixed price, a guarantee, or a contract.',
    ['Select location, property type, project type, area, and rooms.','Select design, civil, electrical, plumbing, carpentry, painting, flooring, kitchen, bathroom, furniture, ceiling, lighting, and other requirements.','Select Basic, Standard, Premium, or Luxury quality.','Select Economy, Standard, Premium, or Client brands material preference.','Provide timeline and an optional budget interval.'],
], 'The product improves planning conversations while preserving professional inspection and quotation as the final commercial authority.')

section('2. Customer workflow','Estimator screen and entry points',[
    'The customer can open Budget estimator from the dashboard navigation or Start with budget estimator from Create Project. The existing six-step project wizard remains available, so the new feature extends the product instead of replacing the established publish workflow.',
    ['Location and property controls establish the context.','Area and room count establish quantity.','Requirements are toggle buttons with clear selected states.','Quality and material controls are segmented choices.','Budget fields support a known range or I do not know.','The result panel remains visible while inputs are changed.'],
    tbl([['Step','User decision','Immediate outcome'],['1','Location and property','City-adjusted base rate'],['2','Scope and quantity','Core project quantity'],['3','Requirements','Additional scope factor'],['4','Quality and materials','Specification multiplier'],['5','Budget','Compatibility state'],['6','Save','Supabase snapshot when authenticated']],[1.1*inch,2.25*inch,2.6*inch])
])

section('3. Calculation engine','Transparent rule-based MVP',[
    'The shared calculation module is src/lib/estimator.ts. It is called by the browser for live preview and by the API for authoritative recalculation. The server never trusts a client-submitted total.',
    p('Base rate × area × location factor × quality factor × material factor × scope factor, then split into materials, labour, professional/design, execution, other requirements, contingency, and taxes.','calloutx'),
    ['City rates are explicit and version-labelled.','Quality and material multipliers are readable constants.','Room count adds a small, bounded adjustment.','Each selected requirement contributes a defined scope factor.','Contingency and tax are separate rows in the breakdown.'],
    ], 'The first version is intentionally deterministic. It can be tested, explained to a customer, and calibrated later with actual project outcomes.')

section('4. Range output','Minimum, maximum, confidence, and assumptions',[
    'The result panel displays the range in Indian currency and shows a confidence label. It also lists what is moving the range and states the assumptions next to the total.',
    tbl([['Output','Meaning'],['Minimum estimate','Realistic lower-cost scenario under the selected scope and assumptions'],['Maximum estimate','Higher specification and uncertainty scenario with contingency'],['Confidence','Medium when scope and area are sufficiently described; Low for sparse inputs'],['Rate version','Identifier tying the result to the rate table used']],[1.5*inch,4.45*inch]),
    ['Breakdown rows show ranges, not false precision.','The estimator names site inspection, measurements, specifications, and material selection as variables.','The estimate remains an indicative planning tool.']
])

section('5. Budget compatibility','Green, yellow, red, and unknown states',[
    'The compatibility classifier compares the client interval with the calculated interval. A fully covering budget is compatible. Partial overlap or a moderate shortfall becomes slight gap. A materially low ceiling becomes major gap. Unknown remains neutral.',
    tbl([['State','Message','Response'],['Compatible','Budget is compatible with estimated requirement','Continue or save'],['Slight gap','Budget is slightly below or overlaps the range','Increase, reduce scope, lower grade, or ask for recommendations'],['Major gap','Budget is significantly below requirement','Remove requirements and recalculate'],['Unknown','Add budget to compare','Continue without judgement']],[1.05*inch,2.8*inch,2.1*inch]),
    ], 'The major-gap state is constructive: the system invites the customer to change the project rather than rejecting it.')

section('6. Dynamic range limiter','The central interaction loop',[
    'The React estimator uses state and memoized calculation. Every material input change immediately updates the range and the cost-driver list.',
    ['Premium to Standard lowers the quality-driven result.','Removing False ceiling or another service removes its contribution.','Changing 1,500 sq.ft. to 1,200 sq.ft. reduces quantity directly.','Adding kitchen, furniture, or similar scope increases the result.','The driver panel helps the customer understand which choices caused movement.'],
    ], 'The calculation is local and instant. Supabase persistence happens only when the customer chooses Save estimate, which keeps the interaction responsive.')

section('7. Supabase data model','Persistence, ownership, and versioning',[
    'The migration at supabase/migrations/20260811000000_project_estimator.sql adds project_estimates and estimation_rate_versions. The estimate keeps the input snapshot, result, breakdown, confidence, budget state, and rate version used at creation time.',
    tbl([['Table','Purpose','Protection'],['project_estimates','Saved customer snapshots and optional project link','RLS: customer reads/inserts own rows'],['estimation_rate_versions','City, quality, material, source, effective date','RLS: admin reads/inserts only'],['projects','Existing project workflow','Existing Sajivo ownership policies']],[1.45*inch,3.05*inch,1.45*inch]),
    ['Indexes support customer history and project lookup.','The app uses the existing Supabase SSR client with the publishable key.','No service-role key is exposed in client code.','The database migration enables RLS before grants are given.']
], 'Release requirement: apply the migration to the connected Supabase project before enabling authenticated persistence in production.')

section('8. API routes','Validation and server behaviour',[
    'POST /api/estimates validates the input with Zod, recalculates on the server, and inserts the snapshot for the authenticated user. GET /api/estimates/rates exposes the current version and constants. POST /api/estimates/rates requires a signed-in profile with primary_role = admin.',
    tbl([['Route','Purpose'],['/api/estimates POST','Validate, calculate, save, return estimate id'],['/api/estimates/rates GET','Return current version and rate constants'],['/api/estimates/rates POST','Create an auditable admin rate version'],['/customer/dashboard/estimator','Render customer estimator'],['/dashboard/estimation-rates','Render protected admin controls']],[2.25*inch,3.7*inch]),
    ['Area, room count, arrays, enums, and text lengths are bounded.','Unauthenticated saves return 401.','Database failures return an actionable error instead of claiming persistence.']
])

section('9. Quote comparison','Estimate to proposal workflow',[
    'The professional proposal form now shows the Sajivo range beside the proposed amount. A quote inside the range is marked within range. A quote above the maximum or substantially below the minimum is flagged and requires a written explanation.',
    ['Within range: professional can submit normally.','Above range: explain specification, site conditions, exclusions, or other factors.','Unusually low: explain exclusions or delivery assumptions.','Customer comparison remains based on professional quotations.'],
    ], 'The estimate is advisory. The agreed professional quote after scope confirmation, negotiation, milestones, and payment terms remains the contractual amount.')

section('10. Admin controls','Rate maintenance and audit trail',[
    'The admin page lets Sajivo maintain city base rates, rate version, and source. Saving creates a new estimation_rate_versions record rather than mutating history. This supports effective dates, operational review, and future calibration.',
    ['Rate versions are stored with every estimate.','Source notes provide a review trail.','The API performs the admin authorization check server-side.','The current constants remain in source for predictable deployments.','A later version can load the active rate version from Supabase without changing the client contract.']
], 'The current release includes the schema and controls; the remote migration must be applied through an authenticated Supabase database channel.')

section('11. Hosting and operations','Vercel and Nginx deployment posture',[
    'Vercel is the primary target. Its managed edge, TLS, server execution, and deployment system provide the reverse-proxy layer for the hosted app. Nginx is supplied as an alternative self-hosted Node configuration in nginx/sajivo.conf.',
    ['The Nginx config redirects HTTP to HTTPS.','It forwards host, client IP, forwarded-for, and protocol headers.','It supports upgrade connections and a 25 MB upload limit.','Vercel and self-hosted Nginx are alternative modes, not stacked by default.','Environment variables remain deployment configuration.'],
    ], 'The application runtime does not ship the prior report or screenshot artifacts.')

section('12. Verification','Checks completed in this workspace',[
    'npm run build passed after the estimator, admin page, proposal warning, API routes, migration, and Nginx changes. Next.js compiled TypeScript, generated the route set, and completed static generation.',
    tbl([['Check','Result'],['Production build','Passed compilation, TypeScript, page generation, optimization'],['Customer estimator route','Present and protected by the existing customer layout'],['Rates API','200 locally with version and factor data'],['Estimate API','Present with Zod validation and Supabase insert path'],['Migration review','RLS, ownership predicates, grants, and indexes included'],['Quote form','Out-of-range warning and justification validation added']],[2.15*inch,3.8*inch]),
    ], 'A signed-in browser acceptance pass remains the release gate for creating a real remote estimate and checking the resulting row under RLS.')

section('13. Release checklist','Complete versus external release steps',[
    ['Complete: estimator inputs, live range, breakdown, confidence, drivers, assumptions, and disclaimer.','Complete: server-side recalculation and validation.','Complete: Supabase migration and RLS policy definitions.','Complete: rate version endpoint and admin UI.','Complete: professional quote variance warning.','Complete: Vercel-ready Next.js build and self-hosted Nginx configuration.','External: apply migration to remote Supabase.','External: create signed-in customer estimate and signed-in admin rate version in staging.','External: verify estimate rows, RLS, proposal flagging, and production deployment variables.']
], 'The implementation is production-shaped, while remote schema application and authenticated staging verification remain deployment steps requiring the project credential.')

section('14. Data feedback loop','How the MVP improves over time',[
    'The saved estimate snapshot is the foundation for an outcome dataset. Future project records should link estimate, professional quote, final agreed price, actual cost, completion time, and change orders.',
    ['Measure the percentage of completed projects inside the predicted range.','Segment variance by city, project type, area, grade, and requirement mix.','Separate scope expansion from genuine underestimation.','Release new rate versions with effective dates and notes.','Introduce ML only after the rule-based dataset is clean and sufficiently large.'],
    ], 'Recommended architecture: keep the calculation contract stable, version every change, and improve explainable rates before introducing opaque prediction.')

section('15. Final summary','End-to-end implementation result',[
    'Sajivo now has the Project Range Limiter and Budget Estimation System requested in the supplied reference PDF. A customer can describe a project, see a transparent minimum-maximum range, compare a budget, refine scope, save the result, and continue to the existing project and proposal workflow.',
    tbl([['Artifact','Location'],['Calculation engine','src/lib/estimator.ts'],['Customer UI','src/features/projects/RangeEstimator.tsx'],['Estimate API','src/app/api/estimates/route.ts'],['Rate admin','src/app/api/estimates/rates and src/app/dashboard/estimation-rates'],['Database migration','supabase/migrations/20260811000000_project_estimator.sql'],['Nginx','nginx/sajivo.conf']],[2.15*inch,3.8*inch]),
    ], 'The system keeps estimation transparent, keeps final pricing contractual only after professional agreement, and stores the information needed to improve accuracy over time.')

def footer(c, doc):
    c.saveState(); c.setStrokeColor(colors.HexColor('#dedfda')); c.line(.65*inch,.55*inch,7.85*inch,.55*inch); c.setFont('Helvetica',7.5); c.setFillColor(colors.HexColor('#7a817a')); c.drawString(.65*inch,.35*inch,'Sajivo | Project Range Limiter & Budget Estimation System'); c.drawRightString(7.85*inch,.35*inch,f'Page {doc.page}'); c.restoreState()

SimpleDocTemplate(str(OUT), pagesize=letter, rightMargin=.65*inch, leftMargin=.65*inch, topMargin=.65*inch, bottomMargin=.75*inch, title='Project Range Limiter and Budget Estimation System').build(story, onFirstPage=footer, onLaterPages=footer)
print(OUT)
