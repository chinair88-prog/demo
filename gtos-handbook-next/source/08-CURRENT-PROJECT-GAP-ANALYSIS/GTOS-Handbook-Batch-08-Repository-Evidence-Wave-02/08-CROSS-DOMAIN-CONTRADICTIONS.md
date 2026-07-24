# 08 — Cross-Domain Contradictions and Canonicalization Register

| ID | Conflict | Required canonical decision |
|---|---|---|
| C-201 | Quality به software gates، mock inspection و stock QC اشاره می‌کند | Trade Quality Domain مستقل ایجاد شود |
| C-202 | Packing List در Tajerestan و Partner وجود دارد | یک System of Record و migration direction تعیین شود |
| C-203 | Commercial Invoice table/read/update دارد، ولی create/generate ندارد | Document lifecycle کامل شود |
| C-204 | Customs با تغییر PO یا declaration action می‌تواند Cleared شود | legal release فقط authority observation باشد |
| C-205 | Import Controller مستقیماً Shipment table را تغییر می‌دهد | Event/contract یا ownership مشترک رسمی تعریف شود |
| C-206 | Booking و Trade Shipment بدون boundary واضح جدا شده‌اند | Booking، Shipment، Leg و Observation ownership تعیین شود |
| C-207 | `HANDED_OVER` به‌جای Custody evidence استفاده می‌شود | CustodyRelationship مستقل ایجاد شود |
| C-208 | Receiving هم در Warehouse Service و هم Provider WMS وجود دارد | Warehouse owner و Provider projection مشخص شود |
| C-209 | Inventory Receipt بلافاصله Available می‌شود | quarantine/quality/channel policy اعمال شود |
| C-210 | tenant field وجود دارد ولی APIها گاهی request parameter یا unscoped lookup دارند | trusted identity context و isolation test |
| C-211 | Eventها بدون outbox فرستاده و خطا swallow می‌شود | outbox/inbox استاندارد شود |
| C-212 | status history در metadata JSON mutable است | append-only transition journal ایجاد شود |
