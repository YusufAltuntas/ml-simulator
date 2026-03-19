import type { Translations } from './en'

export const tr: Translations = {
  nav: {
    title: 'ML/DL Simulatoru',
    home: 'Ana Sayfa',
    theme: 'Tema',
    language: 'Dil',
  },
  home: {
    title: 'Simule Edilecek Modeli Secin',
    subtitle: 'Makine ogrenmesi ve derin ogrenme modellerini adim adim kesfedin',
    filterAll: 'Tumu',
    filterML: 'Klasik ML',
    filterDL: 'Derin Ogrenme',
    filterNLP: 'NLP',
    simulate: 'Simule Et',
    comingSoon: 'Yakinda',
  },
  models: {
    ann: { name: 'YSA / MLP', shortDesc: 'Ileri ve geri yayilimli cok katmanli algilayici', category: 'Derin Ogrenme' },
    cnn: { name: 'CNN', shortDesc: 'Goruntu isleme icin evrisimli sinir agi', category: 'Derin Ogrenme' },
    rnn: { name: 'RNN', shortDesc: 'Ardisik veriler icin tekrarlayan sinir agi', category: 'Derin Ogrenme' },
    lstm: { name: 'LSTM', shortDesc: 'Kapi mekanizmali uzun kisa sureli bellek agi', category: 'Derin Ogrenme' },
    gru: { name: 'GRU', shortDesc: 'Kapili tekrarlayan birim — basitlestirilmis LSTM', category: 'Derin Ogrenme' },
    transformer: { name: 'Transformer', shortDesc: 'Oz-dikkat mekanizmasi ve konumsal kodlama', category: 'Derin Ogrenme' },
    linearRegression: { name: 'Dogrusal Regresyon', shortDesc: 'Dogrusal modelle surekli deger tahmini', category: 'Klasik ML' },
    logisticRegression: { name: 'Lojistik Regresyon', shortDesc: 'Sigmoid fonksiyonuyla ikili siniflandirma', category: 'Klasik ML' },
    decisionTree: { name: 'Karar Agaci', shortDesc: 'Gini/Entropi bolunmeli agac tabanli siniflandirma', category: 'Klasik ML' },
    randomForest: { name: 'Rastgele Orman', shortDesc: 'Bagging ile karar agaci toplulugu', category: 'Klasik ML' },
    svm: { name: 'SVM', shortDesc: 'Marj maksimizasyonlu destek vektor makinesi', category: 'Klasik ML' },
    knn: { name: 'KNN', shortDesc: 'K-en yakin komsu siniflandirmasi', category: 'Klasik ML' },
    xgboost: { name: 'XGBoost', shortDesc: 'Ardisik hata duzeltmeli gradyan artirma', category: 'Klasik ML' },
    nlpPipeline: { name: 'NLP Pipeline', shortDesc: 'Tokenizasyon, gomme ve kodlama hatti', category: 'NLP' },
  },
  simulator: {
    controls: {
      prev: 'Onceki',
      next: 'Sonraki',
      play: 'Oynat',
      pause: 'Duraklat',
      reset: 'Sifirla',
      speed: 'Hiz',
      step: 'Adim',
      of: '/',
      epoch: 'Epoch',
    },
    depth: {
      intuitive: 'Sezgisel',
      technical: 'Teknik',
    },
    panels: {
      parameters: 'Parametreler',
      info: 'Adim Detaylari',
      network: 'Sinir Agi',
      decisionBoundary: 'Karar Siniri',
      lossChart: 'Kayip Grafigi',
    },
  },
  ann: {
    params: {
      layers: 'Ag Katmanlari',
      learningRate: 'Ogrenme Orani',
      activation: 'Aktivasyon Fonksiyonu',
      epochs: 'Epoch Sayisi',
      dataset: 'Veri Seti',
      preset: 'Hazir Ayar',
    },
    datasets: {
      xor: 'XOR Problemi',
      and: 'AND Kapisi',
      or: 'OR Kapisi',
      circle: 'Daire Siniflandirma',
    },
    presets: {
      xorSimple: 'XOR - Basit',
      xorDeep: 'XOR - Derin',
      circle: 'Daire Siniflandirma',
    },
    steps: {
      input: {
        title: 'Girdi',
        description: 'Girdi verisi aga besleniyor. Her girdi noronu bir ozellik degeri alir.',
        technical: 'Girdi vektoru x = [x₁, x₂, ..., xₙ] girdi katmani noronlarina yuklenir. Bu asamada herhangi bir donusum yapilmaz.',
      },
      forwardZ: {
        title: 'Agirlikli Toplam (z)',
        description: 'Her noron girdilerini baglanti agirliklariyla carpar, toplar ve bias ekler. Bu, onemine gore agirliklandirilmis bir "oylama" gibidir.',
        technical: 'z = W · a_onceki + b, burada W agirlik matrisi, a_onceki onceki katman aktivasyonu ve b bias vektorudur.',
      },
      forwardA: {
        title: 'Aktivasyon (a)',
        description: 'Aktivasyon fonksiyonu her noronun ne kadar "aktif" olmasi gerektigine karar verir. Agirlikli toplami kullanisli bir araliga sikistirir.',
        technical: 'a = f(z), burada f aktivasyon fonksiyonudur (sigmoid, ReLU, tanh). Bu, aga dogrusal olmayan ozellik katar.',
      },
      loss: {
        title: 'Kayip Hesapla',
        description: 'Tahminimizin dogru cevaptan ne kadar uzak oldugunu olceriz. Dusuk kayip daha iyi bir tahmin demektir.',
        technical: 'L = (1/n) Σ(yᵢ - ŷᵢ)² (MSE), burada y hedef ve ŷ tahmindir. Kayip gradyani ∂L/∂ŷ = (2/n)(ŷ - y).',
      },
      backward: {
        title: 'Geri Yayilim',
        description: 'Hata ag boyunca geriye dogru akar. Her noron hataya ne kadar katki sagladigini ogrenir.',
        technical: 'δₗ = (Wₗ₊₁ᵀ · δₗ₊₁) ⊙ f\'(zₗ) — Her katmanin deltasi, zincir kurali kullanilarak hesaplanir ve gradyanlar ciktidan girdiye dogru yayilir.',
      },
      update: {
        title: 'Agirliklari Guncelle',
        description: 'Agirliklar hatayi azaltacak yonde hafifce ayarlanir. Bu, ogrenme surecidir!',
        technical: 'W ← W - η · ∂L/∂W, burada η ogrenme oranidir. ∂L/∂W = δ · aₗ₋₁ᵀ delta ve onceki aktivasyonlarin dis carpimidir.',
      },
    },
  },
  help: {
    preset: {
      title: 'Hazir Ayar',
      content: 'Hazir ayar, onceden yapilmis bir konfigurasyondur. Her parametreyi kendiniz ayarlamak yerine bir hazir ayar secin — ag mimarisi, ogrenme orani ve veri seti otomatik ayarlanir. Hizli deneyler icin harikedir!',
    },
    layers: {
      title: 'Ag Katmanlari',
      content: 'Agin her katmaninda kac noron oldugunu gosterir. Ornegin [2 → 4 → 1]: 2 girdi noronu, gizli katmanda 4 noron, 1 cikti noronu. Daha fazla noron = daha karmasik desenleri ogrenme kapasitesi, ama daha yavas.',
    },
    activation: {
      title: 'Aktivasyon Fonksiyonu',
      content: 'Aktivasyon fonksiyonlari bir noronun hangi sinyali ileteceigini belirler. Onlar olmadan ag sadece duz cizgiler ogrenebilir. Sigmoid 0-1 arasinda cikar (olasiliklar icin iyi), ReLU pozitif degerleri oldugu gibi gecirir (hizli egitim), Tanh -1 ile 1 arasinda cikar.',
    },
    learningRate: {
      title: 'Ogrenme Orani',
      content: 'Her ogrenme adiminin ne kadar buyuk oldugunu kontrol eder. Cok yuksek = ag asiri atlar ve asla yakinsamaz. Cok dusuk = ogrenme cok yavas. Tipik degerler: 0.001 - 0.5. Bunu yokustan yururken adim boyutu gibi dusunun — cok buyuk olursa vadiyi atlayabilirsiniz.',
    },
    epochs: {
      title: 'Epoch Sayisi',
      content: 'Bir epoch = ag tum egitim verisini bir kez gorur. Daha fazla epoch = daha fazla pratik. Sinava calismak gibi — materyali bircok kez gozden gecirmek yardimci olur, ama cok fazla tekrar ezber yapar, anlama degil (asiri ogrenme).',
    },
    dataset: {
      title: 'Veri Seti',
      content: 'Agin ogrendigi egitim verisi. XOR, basit bir cizginin siniflari ayiramadigi klasik bir problemdir — ag dogrusal olmayan bir sinir ogrenmek zorundadir. Daire ise benzer ama noktalar daireler seklinde dizilir.',
    },
    network: {
      title: 'Sinir Agi',
      content: 'Bu diyagram agin yapisini gosterir. Daireler noronlar, cizgiler baglantilardir (agirliklar). Renkler aktivasyon degerlerini gosterir: yesil = pozitif/aktif, kirmizi = negatif. Cizgi kalinligi agirlik buyuklugunu gosterir. Titreyen noronlar su anki adimda islenmektedir.',
    },
    decisionBoundary: {
      title: 'Karar Siniri',
      content: 'Bu isi haritasi agin 2 boyutlu uzaydaki her noktayi nasil siniflandirdigini gosterir. Yesil bolgeler = sinif 1, kirmizi bolgeler = sinif 0. Renkli noktalar gercek egitim verileridir. Ag ogrendikce sinirin nasil degistigini izleyin!',
    },
    lossChart: {
      title: 'Kayip Grafigi',
      content: 'Kayip, tahmin hatasini olcer — dusuk olan daha iyidir. Bu grafik kaybin egitim epoch\'lari boyunca nasil azaldigini gosterir. Duzenli azalan bir egri = saglikli ogrenme. Duzlesirse ag takilmis olabilir. Yukseliyorsa ogrenme orani cok yuksek olabilir.',
    },
    stepControls: {
      title: 'Adim Kontrolleri',
      content: 'Simulasyonda adim adim ilerleyin veya otomatik ilerleme icin oynat butonuna basin. Her adim bir islemi gosterir: girdi besleme, agirlikli toplam hesaplama, aktivasyon uygulama, hata hesaplama, gradyan yayilimi veya agirliklari guncelleme.',
    },
    depthToggle: {
      title: 'Sezgisel / Teknik Mod',
      content: 'Iki aciklama stili arasinda gecis yapin. Sezgisel mod basit dil ve benzetmeler kullanir — yeni baslayanlar icin mukemmel. Teknik mod gercek matematik formullerini gosterir — ogrenciler ve uzmanlar icin ideal.',
    },
    stepInfo: {
      title: 'Adim Detaylari',
      content: 'Bu panel su anki adimda ne oldugunu aciklar. Aciklama, formul ve hesaplanan sayisal degerler gosterilir. Detay seviyesini degistirmek icin Sezgisel ve Teknik modlar arasinda gecis yapin.',
    },
  },
}
