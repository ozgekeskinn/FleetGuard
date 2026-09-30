# 🚚 FleetGuard — Akıllı Araç Filo Bakım ve Arıza Yönetim Sistemi

FleetGuard, bir araç filosundaki **araçların, sürücülerin, bakım kayıtlarının ve arızaların yönetimini** simüle eden TypeScript tabanlı bir konsol uygulamasıdır.

Proje; TypeScript'i gerçek bir iş senaryosu üzerinde uygulamak amacıyla geliştirilmiştir. Sistem, araçların bakım durumlarını ve arızalarını analiz eder, sağlık puanı ve risk seviyesi hesaplar, sürücü uygunluğunu kontrol eder ve aracın göreve çıkıp çıkamayacağına karar verir.

> Projede backend, veritabanı, React veya harici API kullanılmamaktadır. Uygulama tamamen TypeScript ve mock veriler üzerinden çalışır.

---

## İçindekiler

- [Özellikler](#ozellikler)
- [Kullanılan TypeScript Konuları](#kullanilan-typescript-konulari)
- [Proje Yapısı](#proje-yapisi)
- [Temel Modeller](#temel-modeller)
  - [Vehicle](#vehicle)
  - [Driver](#driver)
  - [Fault](#fault)
  - [MaintenanceRecord](#maintenance-record)
- [Bakım Sistemi](#bakim-sistemi)
- [Araç Arama Sistemi](#arac-arama-sistemi)
- [Type Assertion Kullanımı](#type-assertion-kullanimi)
- [Araç Sağlık Puanı](#arac-saglik-puani)
- [Risk Sınıflandırması](#risk-siniflandirmasi)
- [Göreve Uygunluk Kontrolü](#goreve-uygunluk-kontrolu)
- [Genel Filo Raporu](#genel-filo-raporu)
- [Test Verileri](#test-verileri)
- [Örnek Sistem Çıktısı](#ornek-sistem-ciktisi)
- [Kurulum ve Çalıştırma](#kurulum-ve-calistirma)
- [Teknik Kazanımlar](#teknik-kazanimlar)
- [Projenin Amacı](#projenin-amaci)

---

<a id="ozellikler"></a>

## Özellikler

- Araç, sürücü, arıza ve bakım kayıtlarının modellenmesi
- Araç kilometre bilgisinin kontrollü şekilde yönetilmesi
- Sürücü ehliyet türüne göre araç kullanım uygunluğu kontrolü
- Çözülmemiş kritik arıza kontrolü
- 10.000 km bakım periyodu takibi
- Bakım gecikmesinin kilometre bazında hesaplanması
- Araçların ID, plaka ve marka üzerinden aranması
- Ham `unknown` verilerin doğrulanması ve Type Assertion kullanımı
- Genel filo raporu oluşturulması
- Araç sağlık puanının hesaplanması
- Sağlık puanına göre risk sınıflandırması
- Araç ve sürücünün göreve uygunluğunun değerlendirilmesi
- Görev reddedildiğinde tüm nedenlerin birlikte gösterilmesi
- Gerçekçi mock veriler ve edge-case senaryoları ile sistem testi

---

<a id="kullanilan-typescript-konulari"></a>

## Kullanılan TypeScript Konuları

| Konu                 | Projedeki Kullanımı                                                                |
| -------------------- | ---------------------------------------------------------------------------------- |
| Types                | `VehicleStatus`, `VehicleType`, `FaultSeverity`, `LicenseType`, `VehicleRiskLevel` |
| Type Assertions      | Ham `unknown` araç verisinin doğrulandıktan sonra beklenen tipe dönüştürülmesi     |
| Functions            | Validasyon, hesaplama ve iş kurallarında                                           |
| Interface            | `IVehicle`, `IDriver`, `IFault`                                                    |
| Class                | `Vehicle`, `Driver`, `Fault`, `MaintenanceRecord` ve servis sınıflarında           |
| Objects              | Araç, sürücü, arıza, bakım ve rapor verilerinde                                    |
| Constructor          | Nesnelerin başlangıç değerleriyle oluşturulmasında                                 |
| Access Modifiers     | `private`, `public`, `readonly` kullanımlarında                                    |
| Properties           | Private kilometre bilgisinin getter ile okunmasında                                |
| Modules              | `models`, `interfaces`, `services`, `utils`, `data` klasör yapısında               |
| Union Types          | Belirli alanların yalnızca izin verilen değerleri almasını sağlamak için           |
| Array Methods        | `find`, `filter`, `some`, `forEach`, `reduce`                                      |
| Dependency Injection | Servislerin ihtiyaç duyduğu diğer servisleri constructor üzerinden almasında       |

---

<a id="proje-yapisi"></a>

## Proje Yapısı

```text
FleetGuard/
│
├── src/
│   ├── data/
│   │   └── mockData.ts
│   │
│   ├── interfaces/
│   │   ├── IDriver.ts
│   │   ├── IFault.ts
│   │   └── IVehicle.ts
│   │
│   ├── models/
│   │   ├── Assignment.ts
│   │   ├── Driver.ts
│   │   ├── Fault.ts
│   │   ├── MaintenanceRecord.ts
│   │   └── Vehicle.ts
│   │
│   ├── services/
│   │   ├── AssignmentService.ts
│   │   ├── FleetService.ts
│   │   ├── MaintenanceService.ts
│   │   └── ReportService.ts
│   │
│   ├── utils/
│   │   ├── calculations.ts
│   │   └── validators.ts
│   │
│   └── index.ts
│
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

---

<a id="temel-modeller"></a>

## Temel Modeller

<a id="vehicle"></a>

### Vehicle

Araç bilgilerini ve araçla ilgili temel davranışları temsil eder. Başlıca alanlar:

- `id`
- `plate`
- `brand`
- `model`
- `year`
- `kilometer`
- `lastMaintenanceKm`
- `status`
- `vehicleType`

Kilometre bilgisi doğrudan dışarıdan değiştirilemez. Değer private olarak tutulur ve yalnızca kontrollü yöntemlerle artırılır.

<a id="driver"></a>

### Driver

Sürücü bilgilerini temsil eder. Başlıca alanlar:

- `id`
- `name`
- `licenseNumber`
- `licenseType`
- `active`

Desteklenen ehliyet türleri:

```text
B
C
D
```

Araç kullanım kuralları:

```text
CAR   → B
VAN   → B
TRUCK → C
BUS   → D
```

<a id="fault"></a>

### Fault

Araç arızalarını temsil eder. Desteklenen arıza seviyeleri:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

Çözülmemiş `CRITICAL` seviyesindeki bir arıza, aracın göreve çıkmasını engeller.

<a id="maintenance-record"></a>

### MaintenanceRecord

Yapılan bakım işlemlerini saklar. Başlıca alanlar:

- `id`
- `vehicleId`
- `kilometer`
- `description`
- `cost`

Yeni bir bakım kaydı uygulandığında aracın `lastMaintenanceKm` değeri güncellenir.

---

<a id="bakim-sistemi"></a>

## Bakım Sistemi

Araçların bakım aralığı:

```text
10.000 KM
```

Bakım durumu üç farklı şekilde gösterilir:

```text
OK       → Bakım zamanı henüz gelmedi
DUE      → Tam bakım sınırına ulaşıldı
OVERDUE  → Bakım sınırı geçildi
```

Ayrıca bakımın kaç kilometre geciktiği de hesaplanır.

---

<a id="arac-arama-sistemi"></a>

## Araç Arama Sistemi

`FleetService` üzerinden araçlar:

- ID
- Plaka
- Marka

bilgilerine göre aranabilir. Plaka aramasında kullanıcı girişleri normalize edilir. Örneğin `06 ABC 123`, `06ABC123` ve `06abc123` aynı araç olarak değerlendirilir.

---

<a id="type-assertion-kullanimi"></a>

## Type Assertion Kullanımı

Projede dışarıdan gelmiş gibi kabul edilen araç verisi `unknown` olarak tanımlanır. Veri doğrudan `Vehicle` olarak kabul edilmez. Önce gerekli alanların bulunup bulunmadığı, alanların doğru veri tiplerinde olup olmadığı ve `status` ile `vehicleType` değerlerinin izin verilen değerlerden biri olup olmadığı kontrol edilir. Doğrulamadan sonra Type Assertion uygulanır ve gerçek bir `Vehicle` nesnesi oluşturulur.

---

<a id="arac-saglik-puani"></a>

## Araç Sağlık Puanı

Her araç sağlık değerlendirmesine `100` puanla başlar. Arızalara göre puan düşürülür:

| Arıza Seviyesi | Puan |
| -------------- | ---: |
| LOW            |   -5 |
| MEDIUM         |  -10 |
| HIGH           |  -20 |
| CRITICAL       |  -40 |

Bakım gecikmesine göre:

| Bakım Gecikmesi | Puan |
| --------------- | ---: |
| 1–1000 KM       |  -10 |
| 1001–4999 KM    |  -20 |
| 5000+ KM        |  -30 |

Sağlık puanı hiçbir zaman `0` değerinin altına düşmez.

---

<a id="risk-siniflandirmasi"></a>

## Risk Sınıflandırması

| Sağlık Puanı | Risk Seviyesi |
| ------------ | ------------- |
| 80–100       | `HEALTHY`     |
| 60–79        | `ATTENTION`   |
| 40–59        | `HIGH_RISK`   |
| 0–39         | `CRITICAL`    |

---

<a id="goreve-uygunluk-kontrolu"></a>

## Göreve Uygunluk Kontrolü

Bir aracın göreve çıkabilmesi için aşağıdaki şartların tamamı sağlanmalıdır:

```text
Araç ACTIVE olmalı
+
Bakım zamanı geçmemiş olmalı
+
Çözülmemiş CRITICAL arıza bulunmamalı
+
Health Score >= 60 olmalı
+
Sürücü aktif olmalı
+
Sürücünün ehliyeti araca uygun olmalı
```

Tüm şartlar sağlanıyorsa:

```text
MISSION READY: YES
```

Herhangi bir şart sağlanmıyorsa:

```text
MISSION READY: NO
```

ve görev reddinin tüm nedenleri `Reasons` altında gösterilir.

---

<a id="genel-filo-raporu"></a>

## Genel Filo Raporu

`ReportService`, filonun genel durumunu özetleyen bir rapor üretir. Örnek:

```text
============ FLEET REPORT ============

Total Vehicles: 15

Active: 13
Maintenance Required: 4
In Service: 1
Out Of Service: 1

Total Faults: 30
Critical Faults: 3

Maintenance Cost: 152,200 TL
```

Toplam bakım maliyeti `reduce()` kullanılarak tüm bakım kayıtlarının maliyetlerinin toplanmasıyla hesaplanır.

---

<a id="test-verileri"></a>

## Test Verileri

Veritabanı kullanılmadığı için sistem `mockData.ts` içerisindeki gerçekçi test verileriyle çalışır. Projede:

```text
15 araç
10 sürücü
30 arıza
20 bakım kaydı
```

bulunur. Test verileri özellikle farklı edge-case senaryolarını kapsar:

- Tamamen sağlıklı araç
- Bakımı 1 KM geçmiş araç
- Çözülmemiş CRITICAL arızalı araç
- Birden fazla LOW arızalı araç
- `OUT_OF_SERVICE` durumundaki araç
- Bakımı geçmiş ve HIGH arızası bulunan araç
- Sağlıklı ancak yanlış ehliyetli sürücü atanmış araç
- Pasif sürücü atanmış araç
- Tam bakım sınırına ulaşmış araç
- Birden fazla HIGH arızaya sahip araç
- Düşük sağlık puanına sahip araç
- Çözülmüş CRITICAL arıza içeren araç

---

<a id="ornek-sistem-ciktisi"></a>

## Örnek Sistem Çıktısı

```text
=======================================
       FLEETGUARD MANAGEMENT SYSTEM
=======================================

Vehicles: 15
Drivers: 10

---------------------------------------
VEHICLE ANALYSIS
---------------------------------------

06 ABC 123
Ford Transit
82,430 KM

Health: 100/100
Risk: HEALTHY
Maintenance: OK
Open Faults: 0

MISSION READY: YES
```

---

<a id="kurulum-ve-calistirma"></a>

## Kurulum ve Çalıştırma

Projeyi klonladıktan sonra proje klasörüne geç:

```bash
cd FleetGuard
```

TypeScript dosyalarını derle:

```bash
tsc
```

Derlenen uygulamayı çalıştır:

```bash
node dist/index.js
```

---

<a id="teknik-kazanimlar"></a>

## Teknik Kazanımlar

Bu proje ile aşağıdaki konular uygulamalı olarak pekiştirilmiştir:

- TypeScript type sistemi
- Union type kullanımı
- Interface ve class ayrımı
- Constructor kullanımı
- Encapsulation
- Access modifiers
- Getter properties
- Type Assertion
- Runtime validation
- Array methods
- Modüler proje yapısı
- Dependency Injection
- Business rule tasarımı
- Edge-case analizi
- Servis sorumluluklarının ayrılması
- Veri doğrulama
- Raporlama
- Risk sınıflandırması
- Çoklu hata nedenlerinin yönetilmesi

---

<a id="projenin-amaci"></a>

## Projenin Amacı

FleetGuard yalnızca araç verilerini tutan basit bir uygulama değildir. Projenin temel amacı, TypeScript ile gerçekçi nesneler modellemek, iş kuralları oluşturmak, sorumlulukları farklı modüllere ayırmak, kontrollü veri yönetimi sağlamak ve birden fazla koşula göre karar veren bir sistem geliştirmektir.
