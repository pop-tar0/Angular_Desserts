import { Component } from '@angular/core';
import { CheckoutService } from 'projects/desserts/src/service/checkout.service';

@Component({
  selector: 'app-checkout1',
  templateUrl: './checkout1.component.html',
  styleUrls: ['../../checkout/checkout.css']
})
export class Checkout1Component {
  public receiveLastName: string = '';
  public receiveFirstName: string = '';
  public receivePhone: string = '';
  public receiveCity: string = '';
  public receiveBlock: string = '';
  public receiveRoad: string = '';
  public availableDistricts: string[] = [];
  public receiveName: string = '';
  public receiveAddress: string = '';
  public readonly cities: any[] = [
    { name: '台北市', districts: ['中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區'] },
    { name: '新北市', districts: ['板橋區', '新莊區', '中和區', '永和區', '土城區', '樹林區', '三峽區', '鶯歌區', '三重區', '蘆洲區', '五股區', '泰山區', '林口區', '八里區', '淡水區', '三芝區', '石門區', '金山區', '萬里區', '汐止區', '平溪區', '貢寮區', '瑞芳區', '雙溪區', '新店區', '深坑區', '石碇區', '坪林區', '烏來區'] },
    { name: '基隆市', districts: ['中正區', '七堵區', '暖暖區', '仁愛區', '安樂區', '信義區'] },
    { name: '桃園市', districts: ['桃園區', '中壢區', '平鎮區', '八德區', '楊梅區', '蘆竹區', '大溪區', '龍潭區', '龜山區', '大園區', '觀音區', '新屋區', '復興區'] },
    { name: '新竹市', districts: ['東區', '北區', '香山區'] },
    { name: '新竹縣', districts: ['竹北市', '湖口鄉', '新豐鄉', '新埔鎮', '關西鎮', '芎林鄉', '寶山鄉', '竹東鎮', '五峰鄉', '橫山鄉', '尖石鄉', '北埔鄉', '峨眉鄉'] },
    { name: '苗栗縣', districts: ['苗慄市', '頭份市', '竹南鎮', '後龍鎮', '通霄鎮', '苑裡鎮', '卓蘭鎮', '大湖鄉', '公館鄉', '銅鑼鄉', '南莊鄉', '頭屋鄉', '三義鄉', '西湖鄉', '造橋鄉', '三灣鄉', '獅潭鄉', '泰安鄉'] },
    { name: '台中市', districts: ['中區', '東區', '南區', '西區', '北區', '北屯區', '西屯區', '南屯區', '太平區', '大里區', '霧峰區', '烏日區', '豐原區', '後里區', '石岡區', '東勢區', '和平區', '新社區', '潭子區', '大雅區', '神岡區', '大肚區', '沙鹿區', '龍井區', '梧棲區', '清水區', '大甲區', '外埔區', '大安區'] },
    { name: '彰化縣', districts: ['彰化市', '員林市', '和美鎮', '鹿港鎮', '溪湖鎮', '二林鎮', '田中鎮', '北鬥鎮', '花壇鄉', '芬園鄉', '大村鄉', '永靖鄉', '伸港鄉', '線西鄉', '福興鄉', '秀水鄉', '埔心鄉', '埔鹽鄉', '大城鄉', '芳苑鄉', '竹塘鄉', '社頭鄉', '二水鄉', '田尾鄉', '埤頭鄉', '溪州鄉'] },
    { name: '南投縣', districts: ['南投市', '埔里鎮', '草屯鎮', '竹山鎮', '集集鎮', '名間鄉', '鹿谷鄉', '中寮鄉', '魚池鄉', '國姓鄉', '水里鄉', '信義鄉', '仁愛鄉'] },
    { name: '嘉義市', districts: ['東區', '西區'] },
    { name: '臺南市', districts: ['中西區', '東區', '南區', '北區', '安平區', '安南區', '永康區', '歸仁區', '新化區', '左鎮區', '玉井區', '楠西區', '南化區', '仁德區', '關廟區', '龍崎區', '官田區', '麻豆區', '佳里區', '西港區', '七股區', '將軍區', '學甲區', '北門區', '新營區', '後壁區', '白河區', '東山區', '六甲區', '下營區', '柳營區', '鹽水區', '善化區', '大內區', '山上區', '新市區', '安定區'] },
    { name: '高雄市', districts: ['新興區', '前金區', '苓雅區', '鹽埕區', '鼓山區', '旗津區', '前鎮區', '三民區', '楠梓區', '小港區', '左營區', '仁武區', '大社區', '岡山區', '路竹區', '阿蓮區', '田寮區', '燕巢區', '橋頭區', '梓官區', '彌陀區', '永安區', '湖內區', '鳳山區', '大寮區', '林園區', '鳥松區', '大樹區', '旗山區', '美濃區', '六龜區', '內門區', '杉林區', '甲仙區', '桃源區', '那瑪夏區', '茂林區', '茄萣區'] },
    { name: '屏東縣', districts: ['屏東市', '潮州鎮', '東港鎮', '恆春鎮', '萬丹鄉', '長治鄉', '麟洛鄉', '九如鄉', '里港鄉', '鹽埔鄉', '高樹鄉', '萬巒鄉', '內埔鄉', '竹田鄉', '新埤鄉', '枋寮鄉', '新園鄉', '崁頂鄉', '林邊鄉', '南州鄉', '佳冬鄉', '琉球鄉', '車城鄉', '滿州鄉', '枋山鄉', '霧臺鄉', '瑪家鄉', '泰武鄉', '來義鄉', '春日鄉', '獅子鄉', '牡丹鄉'] },
    { name: '宜蘭縣', districts: ['宜蘭市', '羅東鎮', '蘇澳鎮', '頭城鎮', '礁溪鄉', '壯圍鄉', '員山鄉', '冬山鄉', '五結鄉', '三星鄉', '大同鄉', '南澳鄉'] },
    { name: '花蓮縣', districts: ['花蓮市', '鳳林鎮', '玉里鎮', '新城鄉', '吉安鄉', '壽豐鄉', '光復鄉', '豐濱鄉', '瑞穗鄉', '富里鄉', '秀林鄉', '萬榮鄉', '卓溪鄉'] },
    { name: '澎湖縣', districts: ['馬公市', '湖西鄉', '白沙鄉', '西嶼鄉', '望安鄉', '七美鄉'] },
    { name: '金門縣', districts: ['金城鎮', '金湖鎮', '金沙鎮', '金寧鄉', '烈嶼鄉', '烏坵鄉'] },
    { name: '連江縣', districts: ['南竿鄉', '北竿鄉', '莒光鄉', '東引鄉'] }
  ];

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit() {
    this.receiveCity = this.cities[0].name;
    this.availableDistricts = this.cities[0].districts;
  }

  //根據不同城市跑出不同鄉鎮市區
  public onCityChange() {
    const selectedCity = this.cities.find(city => city.name === this.receiveCity);
    if (selectedCity) {
      this.availableDistricts = selectedCity.districts;
      this.receiveBlock = selectedCity.districts[0];
    } else {
      this.availableDistricts = []; 
      this.receiveBlock = '';
    }
  }
  
  //全名 = 姓 + 名
  private mergeName() {
    this.receiveName = this.receiveLastName + this.receiveFirstName;
    console.log(this.receiveName);
  }

  //地址 = 縣市 + 鄉鎮市區 + 道路地址
  private mergeAddress() {
    this.receiveAddress = this.receiveCity + this.receiveBlock + this.receiveRoad;
    console.log(this.receiveAddress);
  }

  //透過給 service 存放的方式傳遞 checkout1表單資料
  public setInfo1ToService() {
    this.mergeName();
    this.mergeAddress();
    this.checkoutService.setName(this.receiveName);
    this.checkoutService.setPhone(this.receivePhone);
    this.checkoutService.setAddress(this.receiveAddress)
  }
}
