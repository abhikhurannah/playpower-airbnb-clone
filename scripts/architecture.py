"""Generate the submission architecture diagram. Requires Pillow."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
W,H=2200,1560
img=Image.new('RGB',(W,H),'#f6f8fc'); d=ImageDraw.Draw(img)
fontroot='/System/Library/Fonts/Supplemental/'
def font(n,bold=False):
 p=fontroot+('Arial Bold.ttf' if bold else 'Arial.ttf')
 try:return ImageFont.truetype(p,n)
 except OSError:return ImageFont.truetype('DejaVuSans.ttf',n)
def text(x,y,s,n=25,bold=False,color='#24334e'):
 d.text((x,y),s,font=font(n,bold),fill=color,spacing=9)
def box(x,y,w,h,title,body,accent='#2563eb'):
 d.rounded_rectangle((x,y,x+w,y+h),radius=18,fill='white',outline='#d7dfed',width=2)
 d.rounded_rectangle((x,y,x+7,y+h),radius=3,fill=accent)
 text(x+24,y+20,title,29,True);text(x+24,y+63,body,23,color='#52617a')
def arrow(points,color='#7790b0'):
 d.line(points,fill=color,width=4)
 x,y=points[-1]; px,py=points[-2]
 if y>py:d.polygon([(x,y),(x-9,y-15),(x+9,y-15)],fill=color)
 elif y<py:d.polygon([(x,y),(x-9,y+15),(x+9,y+15)],fill=color)
 elif x>px:d.polygon([(x,y),(x-15,y-9),(x-15,y+9)],fill=color)
 else:d.polygon([(x,y),(x+15,y-9),(x+15,y+9)],fill=color)
text(70,48,'Vacation-rental marketplace',52,True)
text(72,114,'Production architecture  |  Scale reads globally. Keep bookings strongly consistent.',27,color='#52617a')
# Entry and delivery path
box(70,185,430,150,'Web / mobile clients','React UI + server rendering\nAccessible listing and photo tour')
box(590,185,465,150,'Global edge','DNS + CDN + WAF / rate limits\nCached HTML, JS, CSS and images')
box(1145,185,465,150,'Frontend + API gateway','Stateless instances, autoscaling\nAuthentication, BFF, API routing')
box(1700,185,430,150,'Media delivery','Object storage + image variants\nSigned uploads, CDN reads')
arrow([(500,260),(590,260)]);arrow([(1055,260),(1145,260)]);arrow([(1610,260),(1700,260)])
text(70,382,'DOMAIN SERVICES',20,True,color='#2563eb')
for args in [
(70,425,430,155,'Identity + listings','Accounts, hosts, property content\nRole checks on every write'),
(590,425,465,155,'Search + discovery','Geo, filters, ranking, availability\nRead-heavy; cache popular queries'),
(1145,425,465,155,'Booking + payments','Availability holds + reservations\nIdempotent payment workflow'),
(1700,425,430,155,'Messaging + reviews','Guest / host conversations\nNotifications and verified reviews')]:box(*args)
arrow([(1380,335),(1380,380),(285,380),(285,425)])
arrow([(1380,380),(820,380),(820,425)])
arrow([(1380,380),(1380,425)])
arrow([(1380,380),(1915,380),(1915,425)])
# Data row is identified by its storage and processing box titles.
box(70,675,430,165,'PostgreSQL','Multi-AZ primary + read replicas\nUsers, listings, reservations\nPartition by region as needed')
box(590,675,465,165,'Search index + Redis','Geo / full-text index; shards\nCache and short-lived sessions\nEventual consistency for discovery')
box(1145,675,465,165,'Booking transaction store','Unique property / date constraint\nDurable holds, expiry and ledger\nRecheck inventory before payment')
box(1700,675,430,165,'Queue + event workers','Outbox / CDC -> durable events\nRetries, DLQ, idempotent consumers\nEmail, search sync, media resizing')
for x in [285,820,1380,1915]:arrow([(x,580),(x,675)])
arrow([(1610,775),(1700,775)])
arrow([(1915,840),(1915,884),(820,884),(820,840)])
text(910,853,'Events refresh search; never authorize bookings from the index',19,color='#52617a')
text(70,940,'RELIABILITY, SECURITY AND DELIVERY',20,True,color='#2563eb')
box(70,984,655,170,'Deploy safely','Private source -> CI tests / security checks -> artifacts\nInfrastructure as code; multi-AZ container deployment\nCanary rollout, health checks and quick rollback','#059669')
box(770,984,660,170,'Protect and recover','TLS, least privilege, managed secrets and audit trail\nEncrypted backups + point-in-time recovery\nRegional failover; single booking writer per region','#059669')
box(1475,984,655,170,'Observe and operate','Metrics, structured logs, distributed tracing\nAlerts on latency, errors, payment and booking failures\nAutoscale on load and queue depth; restore drills','#059669')
d.rounded_rectangle((70,1200,2130,1488),radius=18,fill='#eaf0fb')
text(98,1225,'Important boundaries',30,True)
text(98,1280,'1. Reserve inventory atomically, then authorize payment; use compensating actions for failures.',25)
text(98,1325,'2. Process provider webhooks once using idempotency keys; reconcile payment and booking state.',25)
text(98,1370,'3. Serve images and listing reads from the edge; scale stateless services independently.',25)
text(98,1415,'Assignment: React + TanStack Start UI, server rendering, local images and browser-only demo state.',24,True)
Path('docs').mkdir(exist_ok=True)
img.save('docs/architecture.png',optimize=True)
