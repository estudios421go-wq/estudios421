import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { BiDonateHeart } from 'react-icons/bi';
// Importamos la base de datos en inglés como en InicioEN_Mobile
import { allSeriesEn } from '../../../../data/en/seriesEn';

const genesisEpisodes = [
  { id: 1, title: "Eden", dur: "43:16", thumb: "https://static.wixstatic.com/media/859174_c53ccb92b54b4aafb86c103d6f72e589~mv2.jpg", url: "https://ok.ru/videoembed/8415267654160" },
  { id: 2, title: "The Consequences", dur: "43:09", thumb: "https://static.wixstatic.com/media/859174_ecc4e327ec1b460aaa9939ab537584f2~mv2.jpg", url: "https://ok.ru/videoembed/8415269161488" },
  { id: 3, title: "Brothers", dur: "42:59", thumb: "https://static.wixstatic.com/media/859174_bb68e238fa014ecfada9c2468e0cdd7f~mv2.jpg", url: "https://ok.ru/videoembed/8415389485584" },
  { id: 4, title: "The Choice", dur: "43:00", thumb: "https://static.wixstatic.com/media/859174_766dd812e5ed40beb8d7a2520e797b6b~mv2.jpg", url: "https://ok.ru/videoembed/8421067065872" },
  { id: 5, title: "An Idea", dur: "43:08", thumb: "https://static.wixstatic.com/media/859174_a96889e87ab8424c9e72f665c45af4dc~mv2.jpg", url: "https://ok.ru/videoembed/8423889570320" },
  { id: 6, title: "The Ark", dur: "43:10", thumb: "https://static.wixstatic.com/media/859174_6e462903bfa94004aa1ac07c2c929f08~mv2.jpg", url: "https://ok.ru/videoembed/8425998518800" },
  { id: 7, title: "Fun", dur: "43:17", thumb: "https://static.wixstatic.com/media/859174_d469b477a1934dbca44c93001dbcc677~mv2.jpg", url: "https://ok.ru/videoembed/8429592971792" },
  { id: 8, title: "The Flood", dur: "43:13", thumb: "https://static.wixstatic.com/media/859174_1b0e1a7eccee4d7aaf17fdc70a7995f6~mv2.jpg", url: "https://ok.ru/videoembed/8429593037328" },
  { id: 9, title: "In The Ark", dur: "43:23", thumb: "https://static.wixstatic.com/media/859174_73e1cf8e8bb34aaa9cee8a1849cf6ed6~mv2.jpg", url: "https://ok.ru/videoembed/8429593102864" },
  { id: 10, title: "The Hunter", dur: "44:01", thumb: "https://static.wixstatic.com/media/859174_67ba82bba9da42e7a37ebfec57fbb009~mv2.jpg", url: "https://ok.ru/videoembed/8429593168400" },
  { id: 11, title: "A Tower", dur: "43:31", thumb: "https://static.wixstatic.com/media/859174_034a79b100044cd8a0d4da76448fd8d8~mv2.jpg", url: "https://ok.ru/videoembed/8431964588560" },
  { id: 12, title: "The Construction", dur: "43:42", thumb: "https://static.wixstatic.com/media/859174_7413f099a7624093a77659454539a67c~mv2.jpg", url: "https://ok.ru/videoembed/8440526080528" },
  { id: 13, title: "A Goddess", dur: "43:40", thumb: "https://static.wixstatic.com/media/859174_d3c7e37d9e014fed8acdff5de5c03bae~mv2.jpg", url: "https://ok.ru/videoembed/8444045691408" },
  { id: 14, title: "Great Danger", dur: "43:54", thumb: "https://static.wixstatic.com/media/859174_33c3b809730740debf4a66d3f9cc68fa~mv2.jpg", url: "https://ok.ru/videoembed/8448069470736" },
  { id: 15, title: "Babel", dur: "43:14", thumb: "https://static.wixstatic.com/media/859174_474cfbdee86b48eda5a923d997a1f0fb~mv2.jpg", url: "https://ok.ru/videoembed/8448191236624" },
  { id: 16, title: "Many Languages", dur: "41:57", thumb: "https://static.wixstatic.com/media/859174_fdec34e0cc80490cb8cf66248832c8da~mv2.jpg", url: "https://ok.ru/videoembed/8450672364048" },
  { id: 17, title: "The Negotiator", dur: "42:43", thumb: "https://static.wixstatic.com/media/859174_a7e6177c5a8c461097cf175721b1eba4~mv2.jpg", url: "https://ok.ru/videoembed/8451820358160" },
  { id: 18, title: "The Mission", dur: "42:57", thumb: "https://static.wixstatic.com/media/859174_86cbd42650ec49c3b82275a654f10d3b~mv2.jpg", url: "https://ok.ru/videoembed/8451820751376" },
  { id: 19, title: "The Cheese Test", dur: "43:24", thumb: "https://static.wixstatic.com/media/859174_3d349902473c4c3aa3eb1db37163ae30~mv2.jpg", url: "https://ok.ru/videoembed/8452211608080" },
  { id: 20, title: "The Caravan", dur: "42:54", thumb: "https://static.wixstatic.com/media/859174_2c151c0038ae481ead043e2721dd5904~mv2.jpg", url: "https://ok.ru/videoembed/8452212001296" },
  { id: 21, title: "Difficulties", dur: "43:05", thumb: "https://static.wixstatic.com/media/859174_cb402528eb2649e998c3256095f379fc~mv2.jpg", url: "https://ok.ru/videoembed/8454627723792" },
  { id: 22, title: "Strange Ally", dur: "42:57", thumb: "https://static.wixstatic.com/media/859174_561eb375440a412c882b683bbf3c629e~mv2.jpg", url: "https://ok.ru/videoembed/8462937688592" },
  { id: 23, title: "High Treason", dur: "42:09", thumb: "https://static.wixstatic.com/media/859174_3016959269d74015b4a2b9ee6eaf102d~mv2.jpg", url: "https://ok.ru/videoembed/8467513084432" },
  { id: 24, title: "Negotiation", dur: "42:39", thumb: "https://static.wixstatic.com/media/859174_f027174b1e9740e381f62b72a5d851f7~mv2.jpg", url: "https://ok.ru/videoembed/8470542223888" },
  { id: 25, title: "Seduction", dur: "43:43", thumb: "https://static.wixstatic.com/media/859174_ed1f3fc7f1cf4eb9a67196de41e183e2~mv2.jpg", url: "https://ok.ru/videoembed/8473316166160" },
  { id: 26, title: "Enemies", dur: "43:02", thumb: "https://static.wixstatic.com/media/859174_c505a168f454441eadeba46953540f9f~mv2.jpg", url: "https://ok.ru/videoembed/8476237761040" },
  { id: 27, title: "The Pain", dur: "42:52", thumb: "https://static.wixstatic.com/media/859174_5c847ca1398044b994cc21e84d87cfc8~mv2.jpg", url: "https://ok.ru/videoembed/8485075880464" },
  { id: 28, title: "Fall", dur: "43:04", thumb: "https://static.wixstatic.com/media/859174_b28c84e163b24e06857f74aa023413f7~mv2.jpg", url: "https://ok.ru/videoembed/8485474273808" },
  { id: 29, title: "No Mercy", dur: "42:59", thumb: "https://static.wixstatic.com/media/859174_1be3c318c2d14a85b780999e1aa04f8f~mv2.jpg", url: "https://ok.ru/videoembed/8485474601488" },
  { id: 30, title: "Lost Children", dur: "43:08", thumb: "https://static.wixstatic.com/media/859174_c55d4d0dba08490aa82546bcd1cae062~mv2.jpg", url: "https://ok.ru/videoembed/8485474732560" },
  { id: 31, title: "Bad Omen", dur: "43:04", thumb: "https://static.wixstatic.com/media/859174_e04880604ccd429b813074deb4d38609~mv2.jpg", url: "https://ok.ru/videoembed/8489266186768" },
  { id: 32, title: "Delivery", dur: "42:19", thumb: "https://static.wixstatic.com/media/859174_dc5707ef527e4998a2f921cfe124d53d~mv2.jpg", url: "https://ok.ru/videoembed/8506738870800" },
  { id: 33, title: "Attack", dur: "42:59", thumb: "https://static.wixstatic.com/media/859174_3961218640c9482bb8a5bc79fee57983~mv2.jpg", url: "https://ok.ru/videoembed/8508966242832" },
  { id: 34, title: "Second Wife", dur: "42:47", thumb: "https://static.wixstatic.com/media/859174_9cfd8cdf8ac74b9aa31ba142f99a01d2~mv2.jpg", url: "https://ok.ru/videoembed/8513425771024" },
  { id: 35, title: "It's Over", dur: "43:00", thumb: "https://static.wixstatic.com/media/859174_57f4a8a3b17d400391128d59b1d7d5b0~mv2.jpg", url: "https://ok.ru/videoembed/8517994875408" },
  { id: 36, title: "Suspicion", dur: "42:22", thumb: "https://static.wixstatic.com/media/859174_7fa905c17bbc47cfaee808f3f62ddf28~mv2.jpg", url: "https://ok.ru/videoembed/8520162806288" },
  { id: 37, title: "Poison", dur: "43:08", thumb: "https://static.wixstatic.com/media/859174_fcc8aa477f354fdaa961832256e55c38~mv2.jpg", url: "https://ok.ru/videoembed/8520163068432" },
  { id: 38, title: "The Trials", dur: "43:04", thumb: "https://static.wixstatic.com/media/859174_d467764cd629419baebd8be1767cf99c~mv2.jpg", url: "https://ok.ru/videoembed/8520163199504" },
  { id: 39, title: "Witness", dur: "41:46", thumb: "https://static.wixstatic.com/media/859174_89e2d5ec3ac84937849b6d3cac362763~mv2.jpg", url: "https://ok.ru/videoembed/8520163527184" },
  { id: 40, title: "Youth", dur: "42:53", thumb: "https://static.wixstatic.com/media/859174_62d406dd58b04b8d96225d94a3869a2e~mv2.jpg", url: "https://ok.ru/videoembed/8520163658256" },
  { id: 41, title: "Love With Benefits", dur: "43:09", thumb: "https://static.wixstatic.com/media/859174_78091a18af9f40f4b1cf465aed6e5995~mv2.jpg", url: "https://ok.ru/videoembed/8520163854864" },
  { id: 42, title: "The Third Time", dur: "43:07", thumb: "https://static.wixstatic.com/media/859174_b6aebdd084bc483ba65a860e0a28f295~mv2.jpg", url: "https://ok.ru/videoembed/8549132929552" },
  { id: 43, title: "Searching For A Culprit", dur: "43:03", thumb: "https://static.wixstatic.com/media/859174_d98806cb671946f085ff53bae7377195~mv2.jpg", url: "https://ok.ru/videoembed/8554816997904" },
  { id: 44, title: "Disappointments", dur: "42:39", thumb: "https://static.wixstatic.com/media/859174_b914f9421c314013a6648acd7afb6d6d~mv2.jpg", url: "https://ok.ru/videoembed/8556646763024" },
  { id: 45, title: "Unforgivable", dur: "44:19", thumb: "https://static.wixstatic.com/media/859174_b69ef528d2564b3aba4fbb35e55a48e5~mv2.jpg", url: "https://ok.ru/videoembed/8556646828560" },
  { id: 46, title: "The Succession", dur: "42:40", thumb: "https://static.wixstatic.com/media/859174_56c54a373cb3410bbdc3695a8405bc56~mv2.jpg", url: "https://ok.ru/videoembed/8556647287312" },
  { id: 47, title: "A New Chapter", dur: "43:20", thumb: "https://static.wixstatic.com/media/859174_24fc049c298f415a98989861efcdb938~mv2.jpg", url: "https://ok.ru/videoembed/8570161203728" },
  { id: 48, title: "Relative Success", dur: "42:56", thumb: "https://static.wixstatic.com/media/859174_d7c1453926994d6ba1b0dede3974e3bf~mv2.jpg", url: "https://ok.ru/videoembed/8570161334800" },
  { id: 49, title: "Deep Mourning", dur: "42:48", thumb: "https://static.wixstatic.com/media/859174_b0c7558dc845455f9676e0ccf93e1eda~mv2.jpg", url: "https://ok.ru/videoembed/8572575681040" },
  { id: 50, title: "The Invasion", dur: "43:08", thumb: "https://static.wixstatic.com/media/859174_fad82a9a70b14cdbbfee2364d6518017~mv2.jpg", url: "https://ok.ru/videoembed/8572576008720" },
  { id: 51, title: "Doubting The Gods", dur: "43:00", thumb: "https://static.wixstatic.com/media/859174_2a445413057a4f9bb5baee811007535a~mv2.jpg", url: "https://ok.ru/videoembed/8572576205328" },
  { id: 52, title: "The Fire", dur: "42:50", thumb: "https://static.wixstatic.com/media/859174_987750ef18df440d99a987c8d79d437f~mv2.jpg", url: "https://ok.ru/videoembed/8591906900496" },
  { id: 53, title: "A New Destination", dur: "42:22", thumb: "https://static.wixstatic.com/media/859174_cbfb83be62ef48b7ad789c3eac4066db~mv2.jpg", url: "https://ok.ru/videoembed/8594135452176" },
  { id: 54, title: "Learning", dur: "43:00", thumb: "https://static.wixstatic.com/media/859174_d5b086b8ddaa43b18ebeec9c4ba4f7f3~mv2.jpg", url: "https://ok.ru/videoembed/8599058188816" },
  { id: 55, title: "Youthful Madness", dur: "42:17", thumb: "https://static.wixstatic.com/media/859174_444e73396b1c487e893f472050367411~mv2.jpg", url: "https://ok.ru/videoembed/8606142368272" },
  { id: 56, title: "Divine Message", dur: "43:01", thumb: "https://static.wixstatic.com/media/859174_12dd1c8e2e5845c5b169f89714ae3098~mv2.jpg", url: "https://ok.ru/videoembed/8756755302928" },
  { id: 57, title: "A Risky Plan", dur: "43:09", thumb: "https://static.wixstatic.com/media/859174_5dc5720f58d8472b913f84c91ecdd84f~mv2.jpg", url: "https://ok.ru/videoembed/875675565072" },
  { id: 58, title: "Bloody Scene", dur: "41:16", thumb: "https://static.wixstatic.com/media/859174_fd60d9d896024cac8bd9bc25f409731c~mv2.jpg", url: "https://ok.ru/videoembed/8756755761680" },
  { id: 59, title: "No More Messages", dur: "43:15", thumb: "https://static.wixstatic.com/media/859174_a2e5bb0d4a914c08a7710ee008903a5b~mv2.jpg", url: "https://ok.ru/videoembed/8756756023824" },
  { id: 60, title: "Keep Walking", dur: "41:41", thumb: "https://static.wixstatic.com/media/859174_071a3992c2824fa5a093a5920ecd46d4~mv2.jpg", url: "https://ok.ru/videoembed/8756756417040" },
  { id: 61, title: "Arrival In Egypt", dur: "42:09", thumb: "https://static.wixstatic.com/media/859174_250cde97d0f9488cad04a39edc4c9142~mv2.jpg", url: "https://ok.ru/videoembed/8756756679184" },
  { id: 62, title: "Unmatched Beauty", dur: "43:09", thumb: "https://static.wixstatic.com/media/859174_23677e8d5aa44bc2942f9fd25bbb9372~mv2.jpg", url: "https://ok.ru/videoembed/8756756875792" },
  { id: 63, title: "False Sister", dur: "42:30", thumb: "https://static.wixstatic.com/media/859174_eb6a8218c12743caa70f9a253420f677~mv2.jpg", url: "https://ok.ru/videoembed/8756757334544" },
  { id: 64, title: "To Be A Queen", dur: "42:45", thumb: "https://static.wixstatic.com/media/859174_0c72f3c869e54eb78847e7cffcccb10b~mv2.jpg", url: "https://ok.ru/videoembed/8756757727760" },
  { id: 65, title: "Ask For Mercy", dur: "42:49", thumb: "https://static.wixstatic.com/media/859174_5ba7ac7371dd42a68ac3c1446782920f~mv2.jpg", url: "https://ok.ru/videoembed/8756757924368" },
  { id: 66, title: "Unbearable Pain", dur: "41:52", thumb: "https://static.wixstatic.com/media/859174_4ee1ae4e0c4e4359a042a5b2b60f6347~mv2.jpg", url: "https://ok.ru/videoembed/8756758186512" },
  { id: 67, title: "An Unfortunate Wedding", dur: "43:12", thumb: "https://static.wixstatic.com/media/859174_50b0a554ae874405aff2ca6836130a15~mv2.jpg", url: "https://ok.ru/videoembed/8756980353552" },
  { id: 68, title: "Disease And Treason", dur: "41:35", thumb: "https://static.wixstatic.com/media/859174_1afbefdb27114202bb770e32a9d9e23a~mv2.jpg", url: "https://ok.ru/videoembed/8756980615696" },
  { id: 69, title: "Separation", dur: "41:00", thumb: "https://static.wixstatic.com/media/859174_da3ab92520634ab184cce4528da06dfb~mv2.jpg", url: "https://ok.ru/videoembed/8756981008912" },
  { id: 70, title: "Divided", dur: "42:24", thumb: "https://static.wixstatic.com/media/859174_05e900292bfc48b38a09022c2802384b~mv2.jpg", url: "https://ok.ru/videoembed/8773260872208" },
  { id: 71, title: "Keep Moving", dur: "41:48", thumb: "https://static.wixstatic.com/media/859174_9ddabb73ea934d3087a22c02d5061603~mv2.jpg", url: "https://ok.ru/videoembed/8795376585232" },
  { id: 72, title: "True Rumors", dur: "42:06", thumb: "https://static.wixstatic.com/media/859174_af08a7d7708f4921a7259fce8c911281~mv2.jpg", url: "https://ok.ru/videoembed/8795376978448" },
  { id: 73, title: "Baby In Arms", dur: "41:19", thumb: "https://static.wixstatic.com/media/859174_d170024984e744cfa596babcf8023865~mv2.jpg", url: "https://ok.ru/videoembed/8795377109520" },
  { id: 74, title: "She Asks For War", dur: "42:29", thumb: "https://static.wixstatic.com/media/859174_fdf59cf096904e4f9f341d7cd6ae61ec~mv2.jpg", url: "https://ok.ru/videoembed/8806294161936" },
  { id: 75, title: "Low Odds", dur: "38:24", thumb: "https://static.wixstatic.com/media/859174_beb0a002fd68474b8ce636481316a262~mv2.jpg", url: "https://ok.ru/videoembed/8806294293008" },
  { id: 76, title: "War Has Arrived", dur: "41:24", thumb: "https://static.wixstatic.com/media/859174_2e471f18cb0a473d9315efb1ecbe6042~mv2.jpg", url: "https://ok.ru/videoembed/8859250919952" },
  { id: 77, title: "For Old Times' Sake", dur: "40:07", thumb: "https://static.wixstatic.com/media/859174_ed46734a48ff47c7ba41a6019e2e8ab9~mv2.jpg", url: "https://ok.ru/videoembed/8859251116560" },
  { id: 78, title: "Surprise Attack", dur: "42:13", thumb: "https://static.wixstatic.com/media/859174_357497e9d37740e881454778fbabae61~mv2.jpg", url: "https://ok.ru/videoembed/8859251378704" },
  { id: 79, title: "The Perfect Plan", dur: "39:59", thumb: "https://static.wixstatic.com/media/859174_3494e79ef3334e408c3de33e8cdf0e63~mv2.jpg", url: "https://ok.ru/videoembed/8859251771920" },
  { id: 80, title: "Difficult Forgiveness", dur: "39:17", thumb: "https://static.wixstatic.com/media/859174_ac7c347f7fac42ee9178a647a2f0b733~mv2.jpg", url: "https://ok.ru/videoembed/8859252099600" },
  { id: 81, title: "Return From The War", dur: "40:26", thumb: "https://static.wixstatic.com/media/859174_3e03aa69f30b413c88cec9427cb02b2b~mv2.jpg", url: "https://ok.ru/videoembed/8863698848272" },
  { id: 82, title: "An Answer", dur: "40:46", thumb: "https://static.wixstatic.com/media/859174_e2712b60188844229659a65125a992ba~mv2.jpg", url: "https://ok.ru/videoembed/8863699044880" },
  { id: 83, title: "A Special Offering", dur: "42:10", thumb: "https://static.wixstatic.com/media/859174_2cdc13b735ba45959b978fb4949ce817~mv2.jpg", url: "https://ok.ru/videoembed/8863699372560" },
  { id: 84, title: "A Strange Family", dur: "39:29", thumb: "https://static.wixstatic.com/media/859174_eb27322957c14e6698068556e68d21ec~mv2.jpg", url: "https://ok.ru/videoembed/8863699569168" },
  { id: 85, title: "Decision Made", dur: "43:24", thumb: "https://static.wixstatic.com/media/859174_25c989f4adb04e93b274e9aff5ea6159~mv2.jpg", url: "https://ok.ru/videoembed/8863699765776" },
  { id: 86, title: "Total Agony", dur: "42:29", thumb: "https://static.wixstatic.com/media/859174_4a7bce1f410f47aea77059d7ec8fcfb7~mv2.jpg", url: "https://ok.ru/videoembed/8863699896848" },
  { id: 87, title: "The Late Son", dur: "40:05", thumb: "https://static.wixstatic.com/media/859174_7dc6a3b3d42647249b92c01eeab5b383~mv2.jpg", url: "https://ok.ru/videoembed/8883622382096" },
  { id: 88, title: "Incredulous", dur: "42:45", thumb: "https://static.wixstatic.com/media/859174_ca7b9733f4dd4b74bbc3000bc9ce5a5f~mv2.jpg", url: "https://ok.ru/videoembed/8883622644240" },
  { id: 89, title: "The Visitors", dur: "42:36", thumb: "https://static.wixstatic.com/media/859174_9086a4408c6444ada7ba569d3c3aa316~mv2.jpg", url: "https://ok.ru/videoembed/8883622906384" },
  { id: 90, title: "Old Loves", dur: "43:07", thumb: "https://static.wixstatic.com/media/859174_49e7d015848c4fdba6f7386725c74e85~mv2.jpg", url: "https://ok.ru/videoembed/8883623234064" },
  { id: 91, title: "Righteous Forsaken", dur: "40:51", thumb: "https://static.wixstatic.com/media/859174_5d471f64db6242fdafecbddc44b71576~mv2.jpg", url: "https://ok.ru/videoembed/8892307671568" },
  { id: 92, title: "Without Looking Back", dur: "39:29", thumb: "https://static.wixstatic.com/media/859174_8b14b9f12908451ab8911dac49c7a359~mv2.jpg", url: "https://ok.ru/videoembed/8892307737104" },
  { id: 93, title: "Sodom And Gomorrah", dur: "40:32", thumb: "https://static.wixstatic.com/media/859174_be775f3452244071ab75a8e2dcf2231d~mv2.jpg", url: "https://ok.ru/videoembed/8892307802640" },
  { id: 94, title: "Endless Night", dur: "39:50", thumb: "https://static.wixstatic.com/media/859174_01b27579a964492f966b7ae07a853365~mv2.jpg", url: "https://ok.ru/videoembed/8967893813776" },
  { id: 95, title: "Bronze Piece", dur: "39:51", thumb: "https://static.wixstatic.com/media/859174_14b9f3c66a3a4b87aceb638ab9424813~mv2.jpg", url: "https://ok.ru/videoembed/9037047925264" },
  { id: 96, title: "Offspring", dur: "38:46", thumb: "https://static.wixstatic.com/media/859174_1e143774d08a4f8a80acd2419dedae8c~mv2.jpg", url: "https://ok.ru/videoembed/9037049170448" },
  { id: 97, title: "Part Of The Harem", dur: "38:48", thumb: "https://static.wixstatic.com/media/859174_ba29cfedcbe44574bf694840d653b620~mv2.jpg", url: "https://ok.ru/videoembed/9166418872848" },
  { id: 98, title: "Scorpions", dur: "41:01", thumb: "https://static.wixstatic.com/media/859174_6e284abd57474fd3ac80d420bb6e78f8~mv2.jpg", url: "https://ok.ru/videoembed/9166419724816" },
  { id: 99, title: "Cursed", dur: "39:32", thumb: "https://static.wixstatic.com/media/859174_092facabef0a47dda929e428fc9ca870~mv2.jpg", url: "https://ok.ru/videoembed/9166421035536" },
  { id: 100, title: "A Son", dur: "39:36", thumb: "https://static.wixstatic.com/media/859174_6ad00fc986694644b9e5d9d9eaf56d1c~mv2.jpg", url: "https://ok.ru/videoembed/9166422280720" },
  { id: 101, title: "Long Story", dur: "41:26", thumb: "https://static.wixstatic.com/media/859174_06bc60c0419d46d58b22e7d4b8d6c691~mv2.jpg", url: "https://ok.ru/videoembed/9420580391440" },
  { id: 102, title: "Spoiled", dur: "40:55", thumb: "https://static.wixstatic.com/media/859174_7ff68c1b0e2d404a8bd213dcf6913b55~mv2.jpg", url: "https://ok.ru/videoembed/9433941019152" },
  { id: 103, title: "God Sent Him", dur: "40:21", thumb: "https://static.wixstatic.com/media/859174_7c929675c8324c32aed3d3a328f68907~mv2.jpg", url: "https://ok.ru/videoembed/9774022527504" },
  { id: 104, title: "Alliances", dur: "41:49", thumb: "https://static.wixstatic.com/media/859174_3456708fcdb64d4281cee6b232fafab8~mv2.jpg", url: "https://ok.ru/videoembed/9774023379472" },
  { id: 105, title: "To Build", dur: "41:28", thumb: "https://static.wixstatic.com/media/859174_89bfde6efcea4958ad104b3055cb1fb6~mv2.jpg", url: "https://ok.ru/videoembed/9774024559120" },
  { id: 106, title: "Your Only Son", dur: "42:11", thumb: "https://static.wixstatic.com/media/859174_5391ce117b674a56a3f3362d96691a37~mv2.jpg", url: "https://ok.ru/videoembed/9774027180560" },
  { id: 107, title: "The Love Of My Life", dur: "41:09", thumb: "https://static.wixstatic.com/media/859174_2dcf1a3e17c04a95bc284602f4bfc82e~mv2.jpg", url: "https://ok.ru/videoembed/9776581642768" },
  { id: 108, title: "Special Woman", dur: "43:26", thumb: "https://static.wixstatic.com/media/859174_c0659b5dae9f475e83adcd4745af6fd4~mv2.jpg", url: "https://ok.ru/videoembed/9786622609936" },
  { id: 109, title: "Future Wife", dur: "42:23", thumb: "https://static.wixstatic.com/media/859174_5098fd0a55e24592888b7f49704a8f3c~mv2.jpg", url: "https://ok.ru/videoembed/9786624051728" },
  { id: 110, title: "Chosen By God", dur: "42:27", thumb: "https://static.wixstatic.com/media/859174_b94b4884829240c0a9f424d6738e4745~mv2.jpg", url: "https://ok.ru/videoembed/9787186678288" },
  { id: 111, title: "Lies", dur: "41:35", thumb: "https://static.wixstatic.com/media/859174_337e9a7de6f34e2aa62f83b013913529~mv2.jpg", url: "https://ok.ru/videoembed/10326065089040" },
  { id: 112, title: "The Promise", dur: "41:44", thumb: "https://static.wixstatic.com/media/859174_fc0b4787cb054e31a523091d8459236e~mv2.jpg", url: "https://ok.ru/videoembed/10326065220112" },
  { id: 113, title: "Intrigues", dur: "42:38", thumb: "https://static.wixstatic.com/media/859174_1426ad88248c404ca0f3c06878c9d59b~mv2.jpg", url: "https://ok.ru/videoembed/10326065416720" },
  { id: 114, title: "The Father Is Gone", dur: "40:27", thumb: "https://static.wixstatic.com/media/859174_7537c0c097124c79a5d07214ef99ac9a~mv2.jpg", url: "https://ok.ru/videoembed/10326065547792" },
  { id: 115, title: "Two Nations", dur: "39:41", thumb: "https://static.wixstatic.com/media/859174_a1b2c73199ac4911b291048996d9eb66~mv2.jpg", url: "https://ok.ru/videoembed/10326065678864" },
  { id: 116, title: "Twins", dur: "39:28", thumb: "https://static.wixstatic.com/media/859174_d42b0f441e59467090aadc02d9680bf4~mv2.jpg", url: "https://ok.ru/videoembed/10326065941008" },
  { id: 117, title: "Archers", dur: "42:48", thumb: "https://static.wixstatic.com/media/859174_2e311e46eeee432f978a9d770b84dab1~mv2.jpg", url: "https://ok.ru/videoembed/10326066072080" },
  { id: 118, title: "Competition", dur: "42:29", thumb: "https://static.wixstatic.com/media/859174_2f76ca636cad44eb8c570ecc208dbd94~mv2.jpg", url: "https://ok.ru/videoembed/10326066137616" },
  { id: 119, title: "The Worst Drought", dur: "39:41", thumb: "https://static.wixstatic.com/media/859174_db06941c990340c5a5fb472bf61e0f15~mv2.jpg", url: "https://ok.ru/videoembed/10326066268688" },
  { id: 120, title: "Meanness", dur: "39:52", thumb: "https://static.wixstatic.com/media/859174_51209f528d7344ea8fff16721471ee2e~mv2.jpg", url: "https://ok.ru/videoembed/10326066334224" },
  { id: 121, title: "Conspiracy", dur: "42:06", thumb: "https://static.wixstatic.com/media/859174_128bcf6068184561a20fbb13ffa65ee8~mv2.jpg", url: "https://ok.ru/videoembed/10328168139280" },
  { id: 122, title: "Deceived", dur: "40:14", thumb: "https://static.wixstatic.com/media/859174_ada67f1273a241e3b80ac4ea2e4fd392~mv2.jpg", url: "https://ok.ru/videoembed/10328168335888" },
  { id: 123, title: "Envy", dur: "41:42", thumb: "https://static.wixstatic.com/media/859174_3d19e8ebf96746c6a830da3e9ed36552~mv2.jpg", url: "https://ok.ru/videoembed/10328168466960" },
  { id: 124, title: "Peace Alliance", dur: "42:10", thumb: "https://static.wixstatic.com/media/859174_935c88c7c3214f6a902b76500b092d0a~mv2.jpg", url: "https://ok.ru/videoembed/10328168598032" },
  { id: 125, title: "Polar Opposites", dur: "40:10", thumb: "https://static.wixstatic.com/media/859174_03134a1eae7849bfab055060c9e1db19~mv2.jpg", url: "https://ok.ru/videoembed/10328168663568" },
  { id: 126, title: "Crazy", dur: "41:47", thumb: "https://static.wixstatic.com/media/859174_8e717893cdec422f93d5acef64540391~mv2.jpg", url: "https://ok.ru/videoembed/10328168925712" },
  { id: 127, title: "Destiny", dur: "42:31", thumb: "https://static.wixstatic.com/media/859174_58795716f25048ad80d7bb93c604151c~mv2.jpg", url: "https://ok.ru/videoembed/10328169253392" },
  { id: 128, title: "The Chosen One", dur: "39:37", thumb: "https://static.wixstatic.com/media/859174_f0caecc3d75247e58f77e13db8e958fc~mv2.jpg", url: "https://ok.ru/videoembed/10328169384464" },
  { id: 129, title: "You Will Look After Me", dur: "40:17", thumb: "https://static.wixstatic.com/media/859174_d4877cf95aa34eabaa07b4b7a6ee86cc~mv2.jpg", url: "https://ok.ru/videoembed/10328169974288" },
  { id: 130, title: "Against The Father", dur: "41:51", thumb: "https://static.wixstatic.com/media/859174_d33bab06bf14419396076a684024e237~mv2.jpg", url: "https://ok.ru/videoembed/10328170170896" },
  { id: 131, title: "Proposition", dur: "41:25", thumb: "https://static.wixstatic.com/media/859174_514cb5fa687742338c1e56aa257e958b~mv2.jpg", url: "https://ok.ru/videoembed/10328879598096" },
  { id: 132, title: "Alternative", dur: "42:42", thumb: "https://static.wixstatic.com/media/859174_3da8e2931a4041e79d61fe27271378f1~mv2.jpg", url: "https://ok.ru/videoembed/10328170629648" },
  { id: 133, title: "Back To Family", dur: "41:02", thumb: "https://static.wixstatic.com/media/859174_6aa643c5e0e84f2ba3c77feec1bc82b3~mv2.jpg", url: "https://ok.ru/videoembed/10328170826256" },
  { id: 134, title: "Disastrous Wedding", dur: "41:45", thumb: "https://static.wixstatic.com/media/859174_1982b17fc33c4ff98f5ea8f1130c3799~mv2.jpg", url: "https://ok.ru/videoembed/10328170957328" },
  { id: 135, title: "Irresponsible", dur: "43:06", thumb: "https://static.wixstatic.com/media/859174_2421222b50444a06aca9930a53f8acea~mv2.jpg", url: "https://ok.ru/videoembed/10328171022864" },
  { id: 136, title: "The Real Reason", dur: "42:08", thumb: "https://static.wixstatic.com/media/859174_f32c2184fe7f4cab9a7b0a604d89c1c0~mv2.jpg", url: "https://ok.ru/videoembed/10328171153936" },
  { id: 137, title: "Shame", dur: "42:39", thumb: "https://static.wixstatic.com/media/859174_6be46e86c93d49a68a3b06599625abb6~mv2.jpg", url: "https://ok.ru/videoembed/10328171219472" },
  { id: 138, title: "Seven Years", dur: "40:13", thumb: "https://static.wixstatic.com/media/859174_94838aee72f7422ba7b64507e91db6a5~mv2.jpg", url: "https://ok.ru/videoembed/10328171350544" },
  { id: 139, title: "Heirs", dur: "42:38", thumb: "https://static.wixstatic.com/media/859174_6a5e18548b4a4a77a79983d2a96c2792~mv2.jpg", url: "https://ok.ru/videoembed/10328171481616" },
  { id: 140, title: "Two Women", dur: "42:57", thumb: "https://static.wixstatic.com/media/859174_41e45ccfc04140ed87c0289387efcc1b~mv2.jpg", url: "https://ok.ru/videoembed/10328171612688" },
  { id: 141, title: "Deception", dur: "41:53", thumb: "https://static.wixstatic.com/media/859174_d1c5b4f54ec94a70bd2ee234a0d9bdf7~mv2.jpg", url: "https://ok.ru/videoembed/10330165479952" },
  { id: 142, title: "Marriages", dur: "41:17", thumb: "https://static.wixstatic.com/media/859174_bb024ea99bcb447fb33aab6ca7a8c31b~mv2.jpg", url: "https://ok.ru/videoembed/10330165742096" },
  { id: 143, title: "Real Love", dur: "39:12", thumb: "https://static.wixstatic.com/media/859174_b962ebf331ef46559d6e823404e4f317~mv2.jpg", url: "https://ok.ru/videoembed/10330165807632" },
  { id: 144, title: "Jealousy", dur: "41:09", thumb: "https://static.wixstatic.com/media/859174_e6608c5b1b084c099f47943b70c2c3ef~mv2.jpg", url: "https://ok.ru/videoembed/10330165873168" },
  { id: 145, title: "The Sorceress", dur: "40:39", thumb: "https://static.wixstatic.com/media/859174_57c22ae4779f4e64b2c6d070e2fd2d6c~mv2.jpg", url: "https://ok.ru/videoembed/10330165938704" },
  { id: 146, title: "Attitude", dur: "41:59", thumb: "https://static.wixstatic.com/media/859174_c3705230bf03496fa215af8361072947~mv2.jpg", url: "https://ok.ru/videoembed/10330166004240" },
  { id: 147, title: "All The Joy", dur: "41:64", thumb: "https://static.wixstatic.com/media/859174_614c5a52286346b6b23441fca000ab79~mv2.jpg", url: "https://ok.ru/videoembed/10330166069776" },
  { id: 148, title: "Strange Death", dur: "40:11", thumb: "https://static.wixstatic.com/media/859174_20fd3ffafb074cb8aa7fe1a72a9334b2~mv2.jpg", url: "https://ok.ru/videoembed/10330166135312" },
  { id: 149, title: "Without Consequences", dur: "41:56", thumb: "https://static.wixstatic.com/media/859174_7f360d9074ce4e0f8d2e2928d2187b21~mv2.jpg", url: "https://ok.ru/videoembed/10330166266384" },
  { id: 150, title: "Repeated History", dur: "40:23", thumb: "https://static.wixstatic.com/media/859174_53a19cb4bebc42d1b86c3588449ef55f~mv2.jpg", url: "https://ok.ru/videoembed/10330166397456" },
  { id: 151, title: "Women", dur: "41:14", thumb: "https://static.wixstatic.com/media/859174_16f19e4c9687415fb6b09712944b29a9~mv2.jpg", url: "https://ok.ru/videoembed/10330166462992" },
  { id: 152, title: "Father Of All", dur: "42:13", thumb: "https://static.wixstatic.com/media/859174_e9a570bfca5b4d98bac17eaa8ba795a8~mv2.jpg", url: "https://ok.ru/videoembed/10330166528528" },
  { id: 153, title: "Approach", dur: "41:06", thumb: "https://static.wixstatic.com/media/859174_1a7b9045798146fbb1e531f9e30122d3~mv2.jpg", url: "https://ok.ru/videoembed/10330288359952" },
  { id: 154, title: "Prosperity", dur: "42:59", thumb: "https://static.wixstatic.com/media/859174_237e076c90c0424596fa20fe0dc4bdd5~mv2.jpg", url: "https://ok.ru/videoembed/10330288425488" },
  { id: 155, title: "The Move", dur: "42:27", thumb: "https://static.wixstatic.com/media/859174_8cbee3628d99436f9bbc6d6bf377624a~mv2.jpg", url: "https://ok.ru/videoembed/10331990788624" },
  { id: 156, title: "Clear Accounts", dur: "41:49", thumb: "https://static.wixstatic.com/media/859174_29fbf08e67ed4127bc9fe2d48bda3bdd~mv2.jpg", url: "https://ok.ru/videoembed/10330452658704" },
  { id: 157, title: "Closer", dur: "40:58", thumb: "https://static.wixstatic.com/media/859174_126d5df02ea440c6856797c8339d4f07~mv2.jpg", url: "https://ok.ru/videoembed/10330452724240" },
  { id: 158, title: "A Change", dur: "44:13", thumb: "https://static.wixstatic.com/media/859174_59292774119048d385ab99a40bbc1ce1~mv2.jpg", url: "https://ok.ru/videoembed/10330452593168" },
  { id: 159, title: "Restless Daughter", dur: "41:31", thumb: "https://static.wixstatic.com/media/859174_cadad575c9164377bee632910c9549e1~mv2.jpg", url: "https://ok.ru/videoembed/10330452789776" },
  { id: 160, title: "Honor", dur: "40:59", thumb: "https://static.wixstatic.com/media/859174_a52c617395564e568b7fd914278bdb83~mv2.jpg", url: "https://ok.ru/videoembed/10332017920528" },
  { id: 161, title: "Bethel", dur: "40:05", thumb: "https://static.wixstatic.com/media/859174_0f3d0a5c5fbb48cb8e662273e6d7e6ee~mv2.jpg", url: "https://ok.ru/videoembed/10332017986064" },
  { id: 162, title: "Future Patriarch", dur: "40:16", thumb: "https://static.wixstatic.com/media/859174_809eb540b72b4e3e93a4e3826a58b416~mv2.jpg", url: "https://ok.ru/videoembed/10332018313744" },
  { id: 163, title: "Leader", dur: "41:25", thumb: "https://static.wixstatic.com/media/859174_8b17008969d54d4a850223946241a2dc~mv2.jpg", url: "https://ok.ru/videoembed/10332018510352" },
  { id: 164, title: "The Dream", dur: "42:49", thumb: "https://static.wixstatic.com/media/859174_fc874e552d51481abdcec35079764bb5~mv2.jpg", url: "https://ok.ru/videoembed/10332018838032" },
  { id: 165, title: "Evil Lost", dur: "41:31", thumb: "https://static.wixstatic.com/media/859174_074c55e74ecc44ea855db57e374c1ad8~mv2.jpg", url: "https://ok.ru/videoembed/10332019100176" },
  { id: 166, title: "Slave", dur: "42:22", thumb: "https://static.wixstatic.com/media/859174_2af807e854464cb9aeb7e4685c4eb3b8~mv2.jpg", url: "https://ok.ru/videoembed/10332019296784" },
  { id: 167, title: "The Tunic", dur: "42:22", thumb: "https://static.wixstatic.com/media/859174_b1f9546cf3704ed996973ec6a18ad662~mv2.jpg", url: "https://ok.ru/videoembed/10332019427856" },
  { id: 168, title: "I Will Never Forget", dur: "42:28", thumb: "https://static.wixstatic.com/media/859174_266220a0ce7b4b1fa72aeda6fc3ea102~mv2.jpg", url: "https://ok.ru/videoembed/10332019558928" },
  { id: 169, title: "The Pharaoh", dur: "41:38", thumb: "https://static.wixstatic.com/media/859174_0de88cd8964b4a1ab4afac05566f6d2e~mv2.jpg", url: "https://ok.ru/videoembed/10332020017680" },
  { id: 170, title: "The Archer", dur: "42:13", thumb: "https://static.wixstatic.com/media/859174_127c9f2b64a145c097e36bdc4fffdea8~mv2.jpg", url: "https://ok.ru/videoembed/10332020410896" },
  { id: 171, title: "I Am Hebrew", dur: "40:40", thumb: "https://static.wixstatic.com/media/859174_2dab2bc53b21465ea04bc181b6d72046~mv2.jpg", url: "https://ok.ru/videoembed/10332021393936" },
  { id: 172, title: "Rich Father", dur: "41:43", thumb: "https://static.wixstatic.com/media/859174_b40774fefbb7413083d4999b851867a6~mv2.jpg", url: "https://ok.ru/videoembed/10332021721616" },
  { id: 173, title: "Accomplice", dur: "42:57", thumb: "https://static.wixstatic.com/media/859174_9742269f86744bf09b1e146db066df4f~mv2.jpg", url: "https://ok.ru/videoembed/10332021852688" },
  { id: 174, title: "Baker", dur: "41:48", thumb: "https://static.wixstatic.com/media/859174_006ad833cae7499faa18b7728928d7a3~mv2.jpg", url: "https://ok.ru/videoembed/10332022114832" },
  { id: 175, title: "Inexistent", dur: "42:52", thumb: "https://static.wixstatic.com/media/859174_7f511784714349669a921d187a57d100~mv2.jpg", url: "https://ok.ru/videoembed/10332022180368" },
  { id: 176, title: "My Little One", dur: "40:43", thumb: "https://static.wixstatic.com/media/859174_9cd1891378d14914a1d2ba97ee4a0153~mv2.jpg", url: "https://ok.ru/videoembed/10332141586960" },
  { id: 177, title: "Confidence", dur: "42:17", thumb: "https://static.wixstatic.com/media/859174_22d1affd5c104aea9cc0b13ca92e6731~mv2.jpg", url: "https://ok.ru/videoembed/10332142111248" },
  { id: 178, title: "Suspicions", dur: "41:18", thumb: "https://static.wixstatic.com/media/859174_62641762b8c343b88888f9bb0f989b7a~mv2.jpg", url: "https://ok.ru/videoembed/10332318206480" },
  { id: 179, title: "Innocent", dur: "42:27", thumb: "https://static.wixstatic.com/media/859174_5169055bf83643e3b3520440732ef3bc~mv2.jpg", url: "https://ok.ru/videoembed/10332318272016" },
  { id: 180, title: "Temptation", dur: "42:21", thumb: "https://static.wixstatic.com/media/859174_9ae837fec5e94a59bcb9a6c8e462eb60~mv2.jpg", url: "https://ok.ru/videoembed/10332318468624" },
  { id: 181, title: "A Mistake", dur: "40:31", thumb: "https://static.wixstatic.com/media/859174_2f33689c630444be9d5f9056cf1b86de~mv2.jpg", url: "https://ok.ru/videoembed/10337738557968" },
  { id: 182, title: "The Family", dur: "41:07", thumb: "https://static.wixstatic.com/media/859174_7dcea61e7ece40eab943eaf7b5fbf2b1~mv2.jpg", url: "https://ok.ru/videoembed/10337738689040" },
  { id: 183, title: "Nightmares", dur: "41:20", thumb: "https://static.wixstatic.com/media/859174_b67a1753db2a4171b2ed4925e8071aca~mv2.jpg", url: "https://ok.ru/videoembed/10337738885648" },
  { id: 184, title: "Possessive", dur: "41:35", thumb: "https://static.wixstatic.com/media/859174_cbb833aa3ccb4d58bb1549054fb7457b~mv2.jpg", url: "https://ok.ru/videoembed/10337739016720" },
  { id: 185, title: "War", dur: "41:56", thumb: "https://static.wixstatic.com/media/859174_25fdbb96b5e9452f8371ce1b743214fa~mv2.jpg", url: "https://ok.ru/videoembed/10337739082256" },
  { id: 186, title: "The Reflection", dur: "39:41", thumb: "https://static.wixstatic.com/media/859174_d2eadbdcf9e746059c6ccac6d68c732f~mv2.jpg", url: "https://ok.ru/videoembed/10337739344400" },
  { id: 187, title: "Seduction", dur: "42:17", thumb: "https://static.wixstatic.com/media/859174_e8585c0098554d85a69c31ee714acbb9~mv2.jpg", url: "https://ok.ru/videoembed/10337739409936" },
  { id: 188, title: "Escape", dur: "41:31", thumb: "https://static.wixstatic.com/media/859174_efac71d5ebe74587aac50b54208a5ae7~mv2.jpg", url: "https://ok.ru/videoembed/10337739475472" },
  { id: 189, title: "Desire", dur: "41:56", thumb: "https://static.wixstatic.com/media/859174_10cf3c9b4a8241a0b4c77644694daa1a~mv2.jpg", url: "https://ok.ru/videoembed/10337739737616" },
  { id: 190, title: "Team", dur: "41:47", thumb: "https://static.wixstatic.com/media/859174_c43a33ac0a544c429c7a14ecb5390872~mv2.jpg", url: "https://ok.ru/videoembed/10337739803152" },
  { id: 191, title: "Great Favor", dur: "41:19", thumb: "https://static.wixstatic.com/media/859174_fc126b458f3c4474872569c7b84ce80c~mv2.jpg", url: "https://ok.ru/videoembed/10337739934224" },
  { id: 192, title: "Shadows", dur: "41:48", thumb: "https://static.wixstatic.com/media/859174_539e06c4ff1e4cacbddaa757072a8800~mv2.jpg", url: "https://ok.ru/videoembed/10337740065296" },
  { id: 193, title: "Accusation", dur: "41:29", thumb: "https://static.wixstatic.com/media/859174_95af3b5d93854460a42141fe766946a3~mv2.jpg", url: "https://ok.ru/videoembed/10337740261904" },
  { id: 194, title: "Postponed", dur: "41:38", thumb: "https://static.wixstatic.com/media/859174_011925f9c24844f8b112e4c8c6981b7f~mv2.jpg", url: "https://ok.ru/videoembed/10337740458512" },
  { id: 195, title: "Two More Years", dur: "41:39", thumb: "https://static.wixstatic.com/media/859174_af48a50b1b2a46f4a19e4fe67e256b7b~mv2.jpg", url: "https://ok.ru/videoembed/10337740589584" },
  { id: 196, title: "Interpretation", dur: "40:34", thumb: "https://static.wixstatic.com/media/859174_e72a902e653a4b068db1d84bbb9c69c2~mv2.jpg", url: "https://ok.ru/videoembed/10337740851728" },
  { id: 197, title: "Translator", dur: "42:54", thumb: "https://static.wixstatic.com/media/859174_c7c01ea8c2c4417986a797f21a15fee7~mv2.jpg", url: "https://ok.ru/videoembed/10337740917264" },
  { id: 198, title: "Execution", dur: "40:36", thumb: "https://static.wixstatic.com/media/859174_4e7419a7a86849738d3d534d60ceef82~mv2.jpg", url: "https://ok.ru/videoembed/10337741048336" },
  { id: 199, title: "Love", dur: "42:12", thumb: "https://static.wixstatic.com/media/859174_df8f20d80dd54b33aa63e546bf9b778f~mv2.jpg", url: "https://ok.ru/videoembed/10337741310480" },
  { id: 200, title: "Kidnapping", dur: "41:27", thumb: "https://static.wixstatic.com/media/859174_62bda78381904a909eff4ac5eba249ba~mv2.jpg", url: "https://ok.ru/videoembed/10337741507088" },
  { id: 201, title: "Vote", dur: "41:03", thumb: "https://static.wixstatic.com/media/859174_4d9b21c7709c4596ac8d9dc912ff5e7b~mv2.jpg", url: "https://ok.ru/videoembed/10340357179920" },
  { id: 202, title: "Give In", dur: "41:30", thumb: "https://static.wixstatic.com/media/859174_9d48d1f661404fb8a8f7002e67fb6ffc~mv2.jpg", url: "https://ok.ru/videoembed/10340357245456" },
  { id: 203, title: "Run", dur: "41:22", thumb: "https://static.wixstatic.com/media/859174_450655acc60849a18c9328bf8ce91054~mv2.jpg", url: "https://ok.ru/videoembed/10340357310992" },
  { id: 204, title: "Friendship", dur: "41:38", thumb: "https://static.wixstatic.com/media/859174_13236c763ffe449f84a8bd2f8b1e326a~mv2.jpg", url: "https://ok.ru/videoembed/10340357769744" },
  { id: 205, title: "Moment", dur: "40:05", thumb: "https://static.wixstatic.com/media/859174_787f43c614374208835ef785542e5155~mv2.jpg", url: "https://ok.ru/videoembed/10340357966352" },
  { id: 206, title: "Marriage", dur: "40:02", thumb: "https://static.wixstatic.com/media/859174_c0262be52392445cbda6a230704d66b9~mv2.jpg", url: "https://ok.ru/videoembed/10340358228496" },
  { id: 207, title: "Solution", dur: "40:58", thumb: "https://static.wixstatic.com/media/859174_79ef2425d5f243daa48088ec3ecd730a~mv2.jpg", url: "https://ok.ru/videoembed/10340358425104" },
  { id: 208, title: "Decision", dur: "40:38", thumb: "https://static.wixstatic.com/media/859174_351625059d564c7eb1c99af2bc988eaa~mv2.jpg", url: "https://ok.ru/videoembed/10340358490640" },
  { id: 209, title: "Sent", dur: "41:23", thumb: "https://static.wixstatic.com/media/859174_d4248b6368fc4af9ab75fb5bfd075c3a~mv2.jpg", url: "https://ok.ru/videoembed/10340358687248" },
  { id: 210, title: "Past", dur: "42:32", thumb: "https://static.wixstatic.com/media/859174_777758bac8e24addb38a5b6c1b261884~mv2.jpg", url: "https://ok.ru/videoembed/10340358818320" },
  { id: 211, title: "Pregnancy", dur: "42:45", thumb: "https://static.wixstatic.com/media/859174_1a8e5b948b37444781ddef1315c9158a~mv2.jpg", url: "https://ok.ru/videoembed/10340359146000" },
  { id: 212, title: "Past", dur: "42:19", thumb: "https://static.wixstatic.com/media/859174_c2aa8eea90de4d90bdbe3710df24cca8~mv2.jpg", url: "https://ok.ru/videoembed/10340359539216" },
  { id: 213, title: "Hunger", dur: "42:30", thumb: "https://static.wixstatic.com/media/859174_de1cfdc22b5e41eca0d1b74d760cb270~mv2.jpg", url: "https://ok.ru/videoembed/10340359342608" },
  { id: 214, title: "Grudge", dur: "44:10", thumb: "https://static.wixstatic.com/media/859174_0920a85d8b854d3d8be404e132ce7518~mv2.jpg", url: "https://ok.ru/videoembed/10340359670288" },
  { id: 215, title: "Honest", dur: "43:40", thumb: "https://static.wixstatic.com/media/859174_1072b72e12b34785a017eae7494fed11~mv2.jpg", url: "https://ok.ru/videoembed/10340359735824" },
  { id: 216, title: "Food", dur: "42:46", thumb: "https://static.wixstatic.com/media/859174_db99e47a0e254e87af912d7f922ff287~mv2.jpg", url: "https://ok.ru/videoembed/10340359801360" },
  { id: 217, title: "Punishment", dur: "43:06", thumb: "https://static.wixstatic.com/media/859174_e49c50ee66474dab83dcf0d4ca148219~mv2.jpg", url: "https://ok.ru/videoembed/10340359932432" },
  { id: 218, title: "Settlers", dur: "39:33", thumb: "https://static.wixstatic.com/media/859174_6d043dafd6644d908f065230bad97fd0~mv2.jpg", url: "https://ok.ru/videoembed/10340360194576" },
  { id: 219, title: "Before Dying", dur: "43:40", thumb: "https://static.wixstatic.com/media/859174_96f482dc4ea0452dbecb5a2e2f2aed42~mv2.jpg", url: "https://ok.ru/videoembed/10340360391184" },
  { id: 220, title: "Caress", dur: "42:00", thumb: "https://static.wixstatic.com/media/859174_e26b65ee655a40f48a00fb5efdffe2fe~mv2.jpg", url: "https://ok.ru/videoembed/10340360653328" },
  { id: 221, title: "All United", dur: "43:54", thumb: "https://static.wixstatic.com/media/859174_ac6e61ae8f7b46fd91b24fe79a1b6cda~mv2.jpg", url: "https://ok.ru/videoembed/10340360915472" }
];

const GenesisEN_Mobile = () => {
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // ID UNIFICADO PARA GÉNESIS
  const SERIES_ID = 1;

  useEffect(() => {
    // --- BLINDAJE MÓVIL ---
    const handleContext = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', handleContext);
    
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    
    // Persistencia de progreso
    const saved = localStorage.getItem('genesis_last_ep_en');
    if (saved) setCurrentIdx(parseInt(saved));
    
    // Verificación de Mi Lista
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (list.includes(SERIES_ID)) setInMyList(true);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('contextmenu', handleContext);
    };
  }, []);

  // BUSCADOR ADAPTADO A INICIOEN_MOBILE
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const term = normalize(searchQuery);
      const filtered = allSeriesEn.filter(serie => {
        const titleNormalized = normalize(serie.title);
        const categoryNormalized = normalize(serie.category || "");
        return titleNormalized.includes(term) || categoryNormalized.includes(term);
      });
      setSearchResults(filtered);
    } else { setSearchResults([]); }
  }, [searchQuery]);

  const openEpisode = (idx: number) => {
    setSelectedVideo(genesisEpisodes[idx].url);
    setCurrentIdx(idx);
    localStorage.setItem('genesis_last_ep_en', idx.toString());
  };

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) { 
      list = list.filter((id: any) => id !== SERIES_ID); 
      setInMyList(false); 
    } else { 
      list.push(SERIES_ID); 
      setInMyList(true); 
    }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  if (selectedVideo) {
    return (
      <div className="fixed inset-0 z-[2000] bg-[#050608] flex flex-col overflow-hidden text-left unselectable">
        <Head><title>Watching: {genesisEpisodes[currentIdx].title}</title></Head>
        <div className="px-6 h-[85px] flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent border-b border-white/5 z-10">
          <div className="flex flex-col border-l-4 border-[#FF8A00] pl-4 py-1 text-left">
            <span className="text-[9px] font-black text-[#FF8A00] uppercase tracking-[0.3em] mb-1">Series: Genesis</span>
            <h2 className="text-sm font-black tracking-tight uppercase truncate max-w-[200px]">
              Ep. {genesisEpisodes[currentIdx].id} <span className="text-white/20 mx-1">|</span> {genesisEpisodes[currentIdx].title}
            </h2>
          </div>
          <button onClick={() => setSelectedVideo(null)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full border border-white/10 active:scale-90 transition-all">
            <IoClose className="text-2xl" />
          </button>
        </div>
        <div className="flex-grow flex flex-col relative bg-black items-center justify-center">
          <iframe src={selectedVideo + "?autoplay=1"} className="w-full aspect-video border-none shadow-[0_0_50px_rgba(0,0,0,1)]" allow="autoplay; fullscreen" allowFullScreen />
          <div className="absolute inset-x-0 bottom-8 flex justify-around items-center px-6">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-[#FF8A00] transition-all"><IoChevronBack size={20} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Previous</span>
            </button>
            <button onClick={() => setSelectedVideo(null)} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center active:bg-white active:text-black transition-all"><IoList size={24} className="text-[#FF8A00]" /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Episodes</span>
            </button>
            <button disabled={currentIdx === genesisEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="flex flex-col items-center gap-2 group disabled:opacity-5">
              <div className="w-12 h-12 rounded-full bg-[#FF8A00] text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,138,0,0.3)] active:scale-110 transition-all"><IoChevronForward size={24} /></div>
              <span className="text-[8px] font-black uppercase tracking-widest text-[#FF8A00]">Next</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#FF8A00] text-left unselectable">
      <Head><title>Genesis — Estudios 421</title></Head>
      
      <nav className={`fixed top-0 w-full z-[110] px-4 py-3 flex items-center gap-4 transition-all duration-300 ${isScrolled || isMenuOpen || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="text-white text-3xl active:scale-90 transition-transform" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>
          <Link href="/en"><div className="relative w-[110px] h-[30px]"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex-grow relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><IoSearchOutline size={16} /></div>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-full py-1.5 pl-9 pr-4 text-xs text-white outline-none focus:bg-white/20 focus:border-[#FF8A00] transition-all" />
        </form>
        <div className="flex-shrink-0"><Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={32} height={32} className="rounded-full ring-2 ring-white/10" /></div>
      </nav>

      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[105] pt-24 px-4 overflow-y-auto pb-20 text-left">
          <h2 className="text-white text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2"><span className="w-1 h-4 bg-[#FF8A00]" />Results: "{searchQuery}"</h2>
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path} onClick={() => setSearchQuery("")}><div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl"><Image src={m.banner} alt={m.title} fill className="object-cover" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      {/* MENU LATERAL TRADUCIDO Y RUTEADO A /EN */}
      <div className={`fixed inset-0 bg-black/98 z-[100] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-8 gap-8 text-left">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2">Navigation</p>
          <Link href="/en" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Home</Link>
          <Link href="/en/biblical-series" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Biblical Series</Link>
          <Link href="/en/tv-shows" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">TV Shows</Link>
          <Link href="/en/movies" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-white">Movies</Link>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/10 pb-2 mt-4">Language</p>
          <div className="flex gap-6">
            {[{l:'ESP', i:'367960b11c1c44ba89cd1582fd1b5776', p:'/serie/genesis'}, {l:'ENG', i:'35112d9ffe234d6f9dcef16cf8f7544e', p:'/en/series/genesis'}, {l:'PT', i:'830f1c20656e4d44a819bedfc13a22cc', p:'/pt/series/genesis'}].map((lang) => (
              <Link key={lang.l} href={lang.p} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                <img src={`https://static.wixstatic.com/media/859174_${lang.i}~mv2.png`} alt={lang.l} className="w-10 h-10 object-contain" /><span className="text-[10px] text-white font-bold">{lang.l}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full pt-0 bg-black shadow-2xl">
        <div className="w-full aspect-[4/3] relative">
          {/* BANNER EN INGLES SOLICITADO */}
          <img src="https://static.wixstatic.com/media/859174_6a6ea45a256e4ce781e37c8adb173eec~mv2.jpg" className="w-full h-full object-contain" alt="Banner" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="px-4 -mt-14 flex flex-col gap-3 relative z-20">
          <button onClick={() => openEpisode(currentIdx)} className="w-full bg-[#FF8A00] text-white font-black py-4 rounded-md text-sm active:scale-95 transition-transform uppercase tracking-[0.2em] shadow-2xl">
            {currentIdx === 0 ? "▶ Watch Now" : `▶ Continue Ep. ${genesisEpisodes[currentIdx].id}`}
          </button>
          <div className="flex gap-3">
            <button onClick={toggleMyList} className={`flex-1 py-3.5 rounded-md text-[10px] font-black border transition-all tracking-widest ${inMyList ? 'bg-white border-white text-black' : 'bg-white/5 border-white/10 text-white active:bg-white/20'}`}>
              {inMyList ? <><IoCheckmarkCircle className="inline mr-1" /> IN MY LIST</> : '+ MY LIST'}
            </button>
            <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="flex-1 bg-white/5 backdrop-blur-md py-3.5 rounded-md text-[10px] font-black border border-white/10 text-white active:bg-white/20 uppercase tracking-widest flex items-center justify-center gap-2"><BiDonateHeart className="text-[#FF8A00]"/> Donate</button>
          </div>
        </div>
      </div>

      <div className="px-5 mt-12 mb-20 text-left">
        <header className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
          <div className="w-1 h-5 bg-[#FF8A00]"></div>
          <h2 className="text-[11px] font-black text-white/50 tracking-[0.3em] uppercase">Available Episodes</h2>
        </header>
        <div className="grid grid-cols-2 gap-5 text-left">
          {genesisEpisodes.map((ep, index) => (
            <div key={ep.id} className="flex flex-col gap-2.5 active:scale-95 transition-all text-left" onClick={() => openEpisode(index)}>
              <div className={`relative aspect-video rounded-lg overflow-hidden border-2 ${currentIdx === index ? 'border-[#FF8A00] shadow-[0_0_15px_rgba(255,138,0,0.2)]' : 'border-white/5'}`}>
                <img src={ep.thumb} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-md px-2 py-0.5 text-[8px] font-black rounded border border-white/10 uppercase">{ep.dur}</span>
              </div>
              <h3 className="font-bold text-[10px] truncate uppercase tracking-tight text-white/90">EP. {ep.id} {ep.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-[#0a0a0a] text-gray-500 py-10 px-6 border-t border-white/5 text-left">
        <div className="flex justify-start gap-6 mb-8 text-xl">
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#FF8A00] transition-colors"><FaFacebookF /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#FF8A00] transition-colors"><FaInstagram /></a>
          <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer" className="active:text-[#FF8A00] transition-colors"><FaTiktok /></a>
          <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer" className="active:text-[#FF8A00] transition-colors"><FaYoutube /></a>
          <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="active:text-[#FF8A00] transition-colors"><FaXTwitter /></a>
        </div>
        <div className="space-y-4 mb-8">
          <p className="text-[10px] leading-relaxed">© {new Date().getFullYear()} Estudios 421. All rights reserved on the design and editing of the platform.</p>
          <p className="text-[9px] leading-relaxed text-gray-600 text-justify">Legal Notice: The audiovisual content shared on this site belongs to its respective owners and production companies. Estudios 421 is a non-profit platform destined to the dissemination of biblical content.</p>
        </div>
        <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest border-t border-white/5 pt-8">
          <Link href="/en/privacy-policy">Privacy Policy</Link>
          <Link href="/en/terms-of-use">Terms of Use</Link>
          <Link href="/en/cookies">Cookie Settings</Link>
          <Link href="/en/ads">Ad Specifications</Link>
          <Link href="/en/help">Help Center</Link>
        </div>
      </footer>

      <style jsx global>{`
        .unselectable { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-touch-callout: none; }
        img { pointer-events: none !important; -webkit-user-drag: none !important; }
        body { -webkit-user-select: none; user-select: none; }
      `}</style>
    </div>
  );
};

export default GenesisEN_Mobile;
