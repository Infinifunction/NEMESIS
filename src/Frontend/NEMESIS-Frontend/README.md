# NEMESIS Frontend

NEMESIS Frontend, yapay zekayı genişletilebilir ve bağlamsal bir çalışma ortamına dönüştürmeyi amaçlayan NEMESIS masaüstü uygulamasının ön yüzüdür. Arayüz React, TypeScript, Electron ve Vite üzerinde kurulu olup "Dark Premium AI Workspace" tasarım dilini kullanır.

Bu README, mevcut arayüzün geçici tanıtım belgesidir. Henüz tamamlanmamış backend ve sağlayıcı entegrasyonları için arayüz akışları bulunur; gerçek bir entegrasyon olmayan işlemler başarılı olarak sunulmaz.

## Ne Yapılır?

Frontend; sohbet, otomasyon, özelleştirme, ayarlar, projeler ve oturumlar için uygulama kabuğunu sunar.

- Yeni sohbet başlatabilir ve yerel chat akışı çalıştırabilirsiniz.
- Sidebar üzerinden Automations, Customize ve Settings sayfalarına geçebilirsiniz.
- Projects bölümünden proje oluşturabilir ve proje çalışma alanını açabilirsiniz.
- Sessions bölümünden Chat, GitHub, URL veya yerel klasör akışlarına ait placeholder arayüzleri açabilirsiniz.
- Chat Composer üzerinden çok satırlı mesaj yazabilir ve Enter ile gönderebilirsiniz.
- +, Plan, Model, Chat ve This computer kontrollerini açabilir ve seçimler yapabilirsiniz.
- Plus, Chat ve Execution menülerinde backend bağımlı işlemler için sol alt köşede toast bildirimleri görünür.

## Chat Arayüzü

Chat ekranında iki temel durum bulunur.

### Başlangıç Durumu

- NEMESIS markası ana alanın merkezinde gösterilir.
- Birleşik Composer logo ile öneri kartlarının arasında dengeli şekilde konumlanır.
- Suggested Prompt kartları başlangıç fikirleri sunar.
- Kartlara basıldığında öneri metni Composer'a aktarılır.

### Aktif Sohbet Durumu

- İlk mesaj gönderildiğinde logo ve öneri kartları kaldırılır.
- Mesaj geçmişi görünür hale gelir.
- Yeni mesajlar geldikçe konuşma alanı otomatik olarak aşağı kaydırılır.
- Composer, ekranın alt kısmında yatay olarak merkezlenir.

## Chat Composer

Composer tek bir iki katmanlı bileşendir:

- Üst kısımda çok satırlı mesaj alanı bulunur.
- Alt sol tarafta +, Plan ve Default kontrolleri bulunur.
- Alt sağ tarafta mikrofon placeholder ve gönderme butonu bulunur.
- Composer'ın altında Chat ve This computer seçimleri bulunur.
- Enter mesaj gönderir; Shift+Enter yeni satır ekler.

Frontend state'i içinde yönetilen seçimler:

- Plan mode: Interactive, Plan veya Autopilot
- Tool permissions: Always ask, Assisted veya Approve all
- Chat mode
- Execution environment
- Model Fusion toggle placeholder

GitHub, URL, yerel klasör, model sağlayıcıları ve cloud environment akışları henüz backend'e bağlı değildir. Bu nedenle bağlantı gerektiren seçenekler yalnızca arayüz akışı sunar ve toast bildirimlerinde gerçek bir entegrasyon olduğu iddiası yapılmaz.

## Tasarım Sistemi

Frontend mevcut NEMESIS koyu tasarım dilini kullanır:

- Ana arka plan: `#111315`
- Sidebar: `#171A1D`
- İkincil yüzeyler: `#1D2125`
- Kartlar ve giriş alanları: `#24282C`
- Ana metin: `#F0F0F0`
- İkincil metin: `#92989F`
- Vurgu rengi: `#E5484D`

Arayüz Lucide ikonları, odak görünümleri, hover durumları, kısa geçişler ve 320px alt sınırına sahip responsive masaüstü düzeniyle hazırlanmıştır.

## Bileşen Yapısı

Önemli renderer bileşenleri:

- `Sidebar`: Ana navigasyon, Projects, Sessions ve hesap alanı
- `ChatLayout`: Başlangıç ve aktif sohbet yerleşimleri
- `ChatComposer`: Bütünleşik chat giriş alanı
- `ComposerMenus`: Plus, Chat, Environment, Plan ve Model menüleri
- `SuggestedPrompts`: Başlangıç öneri kartları
- `ToastViewport`: Tekrarlanabilir bildirim sistemi
- `PlaceholderPage`: Backend bağımlı veya henüz hazır olmayan alanlar

## Proje Yapısı

```text
src/
  main/
    Electron ana süreç kodu
  preload/
    Renderer ile kontrollü Electron API sınırı
  renderer/src/
    App.tsx
    components/
    assets/
```

Renderer sürecine doğrudan Node.js veya ayrıcalıklı Electron API erişimi verilmez.

## Gereksinimler

- Node.js ve npm
- Windows, macOS veya Linux için uygun Electron geliştirme ortamı

## Kurulum

Frontend klasöründe bağımlılıkları kur:

```bash
npm install
```

## Geliştirme

Uygulamayı Electron geliştirme modunda çalıştır:

```bash
npm run dev
```

Vite Electron geliştirme sunucusu ile birlikte renderer değişikliklerini canlı olarak yükler.

## Kontroller

TypeScript kontrollerini çalıştır:

```bash
npm run typecheck
```

Lint kontrolü:

```bash
npm run lint
```

Production build:

```bash
npm run build
```

Platform paketleri:

```bash
npm run build:win
npm run build:mac
npm run build:linux
```

## Mevcut Teknik Sınırlar

- Sohbet yanıtları şimdilik yerel önizleme davranışıdır.
- GitHub, URL ve yerel klasör seçimi gerçek dosya veya repository içe aktarması yapmaz.
- Cloud environment, model listesi ve araç izinleri gerçek sağlayıcılarla bağlı değildir.
- Otomasyon, Customize ve Settings alanları genişletilebilir placeholder sayfalardır.

Bu sınırlar arayüzün geçici davranışlarıdır ve backend entegrasyonu eklenene kadar gerçek başarı olarak sunulmaz.
