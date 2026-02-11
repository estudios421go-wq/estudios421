import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoSearchOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoList, IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
// Importamos la base de datos en inglés para el buscador
import { allSeriesEn } from '../../../../data/en/seriesEn';

const genesisEpisodes = [
{ id: 1, title: "Eden", dur: "00:43:16", desc: "This is the story of how everything was created by God and the beginning of humanity with Adam and Eve, the first man and woman on earth.", thumb: "https://static.wixstatic.com/media/859174_c53ccb92b54b4aafb86c104d6f72e589~mv2.jpg", url: "https://ok.ru/videoembed/8415267654160" },
  { id: 2, title: "The Consequences", dur: "00:43:09", desc: "Adam and Eve must live with the consequences of eating the forbidden fruit. They were expelled from paradise.", thumb: "https://static.wixstatic.com/media/859174_ecc4e327ec1b460aaa9939ab537584f2~mv2.jpg", url: "https://ok.ru/videoembed/8415269161488" },
  { id: 3, title: "Brothers", dur: "00:42:59", desc: "Cain and Abel are the sons of Adam and Eve; both try to survive, but they are very different: Abel is noble and thankful.", thumb: "https://static.wixstatic.com/media/859174_bb68e238fa014ecfada9c2468e0cdd7f~mv2.jpg", url: "https://ok.ru/videoembed/8415389485584" },
  { id: 4, title: "The Choice", dur: "00:43:00", desc: "Cain and Abel manage to catch God's attention, but Cain is sure He only responded to Abel's gifts.", thumb: "https://static.wixstatic.com/media/859174_766dd812e5ed40beb8d7a2520e797b6b~mv2.jpg", url: "https://ok.ru/videoembed/8421067065872" },
  { id: 5, title: "An Idea", dur: "00:43:08", desc: "Cain finds the place where all his sisters settled after abandoning their father and decides to find a wife there.", thumb: "https://static.wixstatic.com/media/859174_a96889e87ab8424c9e72f665c45af4dc~mv2.jpg", url: "https://ok.ru/videoembed/8423889570320" },
  { id: 6, title: "The Ark", dur: "00:43:10", desc: "Noah is a good man among all the corrupt people. God tells him he will have an important mission: to build an ark.", thumb: "https://static.wixstatic.com/media/859174_6e462903bfa94004aa1ac07c2c929f08~mv2.jpg", url: "https://ok.ru/videoembed/8425998518800" },
  { id: 7, title: "Fun", dur: "00:43:17", desc: "Ham is one of Noah's sons and is married to Tali, a young woman who yearns for more fun in her life.", thumb: "https://static.wixstatic.com/media/859174_d469b477a1934dbca44c93001dbcc677~mv2.jpg", url: "https://ok.ru/videoembed/8429592971792" },
  { id: 8, title: "The Flood", dur: "00:43:13", desc: "Noah is very worried about Ham and Tali, as everyone has seen the birds fly and is sure the flood is near.", thumb: "https://static.wixstatic.com/media/859174_1b0e1a7eccee4d7aaf17fdc70a7995f6~mv2.jpg", url: "https://ok.ru/videoembed/8429593037328" },
  { id: 9, title: "In The Ark", dur: "00:43:23", desc: "Noah and his family remain in the ark for forty days and nights, causing his children to grow restless.", thumb: "https://static.wixstatic.com/media/859174_73e1cf8e8bb34aaa9cee8a1849cf6ed6~mv2.jpg", url: "https://ok.ru/videoembed/8429593102864" },
  { id: 10, title: "The Hunter", dur: "00:44:01", desc: "After many years, communities are built again and in one of them dwells a great hunter, Nimrod.", thumb: "https://static.wixstatic.com/media/859174_67ba82bba9da42e7a37ebfec57fbb009~mv2.jpg", url: "https://ok.ru/videoembed/8429593168400" },
  { id: 11, title: "A Tower", dur: "00:43:31", desc: "Nimrod has an idea: build a tower so high that everyone can see it and distinguish his people.", thumb: "https://static.wixstatic.com/media/859174_034a79b100044cd8a0d4da76448fd8d8~mv2.jpg", url: "https://ok.ru/videoembed/8431964588560" },
  { id: 12, title: "The Construction", dur: "00:43:42", desc: "Construction of the tower begins and Nimrod tries to convince everyone to work very hard on the project.", thumb: "https://static.wixstatic.com/media/859174_7413f099a7624093a77659454539a67c~mv2.jpg", url: "https://ok.ru/videoembed/8440526080528" },
  { id: 13, title: "A Goddess", dur: "00:43:40", desc: "Guided by the forces of evil, Semiramis begins to obtain strange powers and women want to follow her.", thumb: "https://static.wixstatic.com/media/859174_d3c7e37d9e014fed8acdff5de5c03bae~mv2.jpg", url: "https://ok.ru/videoembed/8444045691408" },
  { id: 14, title: "Great Danger", dur: "00:43:54", desc: "Nimrod decides to distance his beloved Liba to prevent his mother from harming her. Construction continues.", thumb: "https://static.wixstatic.com/media/859174_33c3b809730740debf4a66d3f9cc68fa~mv2.jpg", url: "https://ok.ru/videoembed/8448069470736" },
  { id: 15, title: "Babel", dur: "00:43:14", desc: "Nimrod is bewitched by his mother and he is tired of their sick relationship and plans to end it.", thumb: "https://static.wixstatic.com/media/859174_474cfbdee86b48eda5a923d997a1f0fb~mv2.jpg", url: "https://ok.ru/videoembed/8448191236624" },
  { id: 16, title: "Many Languages", dur: "00:41:57", desc: "After the fall of the Tower of Babel and the difference in languages, people created different places to live.", thumb: "https://static.wixstatic.com/media/859174_fdec34e0cc80490cb8cf66248832c8da~mv2.jpg", url: "https://ok.ru/videoembed/8450672364048" },
  { id: 17, title: "The Negotiator", dur: "00:42:43", desc: "Terah visits the royal priest at the temple in Ur and receives a mission if he wants to do business.", thumb: "https://static.wixstatic.com/media/859174_a7e6177c5a8c461097cf175721b1eba4~mv2.jpg", url: "https://ok.ru/videoembed/8451820358160" },
  { id: 18, title: "The Mission", dur: "00:42:57", desc: "Terah goes to visit an old hermit whom he must convince to give him his goats for the palace of Ur.", thumb: "https://static.wixstatic.com/media/859174_86cbd42650ec49c3b82275a654f10d3b~mv2.jpg", url: "https://ok.ru/videoembed/8451820751376" },
  { id: 19, title: "The Cheese Test", dur: "00:43:24", desc: "Terah now has to demonstrate in the palace that he managed to get the hermit's recipe for making cheese.", thumb: "https://static.wixstatic.com/media/859174_3d349902473c4c3aa3eb1db37163ae30~mv2.jpg", url: "https://ok.ru/videoembed/8452211608080" },
  { id: 20, title: "The Caravan", dur: "00:42:54", desc: "A new test is assigned to Terah: he must lead his first caravan for the kingdom and conduct business.", thumb: "https://static.wixstatic.com/media/859174_2c151c0038ae481ead043e2721dd5904~mv2.jpg", url: "https://ok.ru/videoembed/8452212001296" },
  { id: 21, title: "Difficulties On The Way", dur: "00:43:05", desc: "Terah knows his task is not simple and that he will have to face strangers and nature itself.", thumb: "https://static.wixstatic.com/media/859174_cb402528eb2649e998c3256095f379fc~mv2.jpg", url: "https://ok.ru/videoembed/8454627723792" },
  { id: 22, title: "Strange Ally", dur: "00:42:57", desc: "The priests have sent an assassin to get rid of Terah on his mission, but first he will want to help him.", thumb: "https://static.wixstatic.com/media/859174_561eb375440a412c882b683bbf3c629e~mv2.jpg", url: "https://ok.ru/videoembed/8462937688592" },
  { id: 23, title: "High Treason", dur: "00:42:09", desc: "The Queen of Ur has plans that plot against the King, now that he will have a new wife.", thumb: "https://static.wixstatic.com/media/859174_3016959269d74015b4a2b9ee6eaf102d~mv2.jpg", url: "https://ok.ru/videoembed/8467513084432" },
  { id: 24, title: "Negotiation", dur: "00:42:39", desc: "Terah manages to capture one of the priests who wants him dead and tells him he must leave Ur.", thumb: "https://static.wixstatic.com/media/859174_f027174b1e9740e381f62b72a5d851f7~mv2.jpg", url: "https://ok.ru/videoembed/8470542223888" },
  { id: 25, title: "Seduction", dur: "00:43:43", desc: "Terah feels seduced by Nadi and not only that, also by the power and wealth the palace can provide.", thumb: "https://static.wixstatic.com/media/859174_ed1f3fc7f1cf4eb9a67196de41e183e2~mv2.jpg", url: "https://ok.ru/videoembed/8473316166160" },
  { id: 26, title: "Enemies", dur: "00:43:02", desc: "The Amorites are the enemies of the kingdom of Ur who have begun to carry out attacks that scare the people.", thumb: "https://static.wixstatic.com/media/859174_c505a168f454441eadeba46953540f9f~mv2.jpg", url: "https://ok.ru/videoembed/8476237761040" },
  { id: 27, title: "The Pain Of Deceit", dur: "00:42:52", desc: "Amat discovers that Terah and Nadi are lovers and he asks her not to reveal anything to the priests.", thumb: "https://static.wixstatic.com/media/859174_5c847ca1398044b994cc21e84d87cfc8~mv2.jpg", url: "https://ok.ru/videoembed/8485075880464" },
  { id: 28, title: "The Priest's Fall", dur: "00:43:04", desc: "Kissare, the high priest of Ur, falls down the stairs and has injuries that leave him between life and death.", thumb: "https://static.wixstatic.com/media/859174_b28c84e163b24e06857f74aa023413f7~mv2.jpg", url: "https://ok.ru/videoembed/8485474273808" },
  { id: 29, title: "No Mercy", dur: "00:42:59", desc: "Morabi, the priest who wants to kill Kissare, does not stop and tries to take his life.", thumb: "https://static.wixstatic.com/media/859174_1be3c318c2d14a85b780999e1aa04f8f~mv2.jpg", url: "https://ok.ru/videoembed/8485474601488" },
  { id: 30, title: "Lost Children", dur: "00:43:08", desc: "Abraham and Dnin Sim, the son of the king of Ur, were kidnapped by the Amorites and plan to negotiate.", thumb: "https://static.wixstatic.com/media/859174_c55d4d0dba08490aa82546bcd1cae062~mv2.jpg", url: "https://ok.ru/videoembed/8485474732560" },
  { id: 31, title: "Bad Omen", dur: "00:43:04", desc: "The King of Ur has a nightmare and is sure it is a message from the gods to his people.", thumb: "https://static.wixstatic.com/media/859174_e04880604ccd429b813074deb4d38609~mv2.jpg", url: "https://ok.ru/videoembed/8489266186768" },
  { id: 32, title: "Hostage Delivery", dur: "00:42:19", desc: "The King of Ur and the leader of the Amorites agree to carry out the exchange of their relatives.", thumb: "https://static.wixstatic.com/media/859174_dc5707ef527e4998a2f921cfe124d53d~mv2.jpg", url: "https://ok.ru/videoembed/8506738870800" },
  { id: 33, title: "Surprise Attack", dur: "00:42:59", desc: "The city of Ur receives a surprise attack from the Amorites and many people die.", thumb: "https://static.wixstatic.com/media/859174_3961218640c9482bb8a5bc79fee57983~mv2.jpg", url: "https://ok.ru/videoembed/8508966242832" },
  { id: 34, title: "The Second Wife", dur: "00:42:47", desc: "Terah will marry Nadi and she will officially become his second wife.", thumb: "https://static.wixstatic.com/media/859174_9cfd8cdf8ac74b9aa31ba142f99a01d2~mv2.jpg", url: "https://ok.ru/videoembed/8513425771024" },
  { id: 35, title: "The Love Is Over", dur: "00:43:00", desc: "Terah and Nadi argue, as he thinks their marriage was a mistake and she cannot believe it.", thumb: "https://static.wixstatic.com/media/859174_57f4a8a3b17d400391128d59b1d7d5b0~mv2.jpg", url: "https://ok.ru/videoembed/8517994875408" },
  { id: 36, title: "Suspicion of Treason", dur: "00:42:22", desc: "The King of Ur begins to suspect that his wife wants to betray him and takes measures.", thumb: "https://static.wixstatic.com/media/859174_7fa905c17bbc47cfaee808f3f62ddf28~mv2.jpg", url: "https://ok.ru/videoembed/8520162806288" },
  { id: 37, title: "Too Much Poison", dur: "00:43:08", desc: "The King of Ur confronts his queen and proves that she is the one who has been poisoning people.", thumb: "https://static.wixstatic.com/media/859174_fcc8aa477f354fdaa961832256e55c38~mv2.jpg", url: "https://ok.ru/videoembed/8520163068432" },
  { id: 38, title: "The Trials", dur: "00:43:04", desc: "Two trials are held, that of the Queen of Ur and that of Morabi for attempting to kill the priest.", thumb: "https://static.wixstatic.com/media/859174_d467764cd629419baebd8be1767cf99c~mv2.jpg", url: "https://ok.ru/videoembed/8520163199504" },
  { id: 39, title: "Key Witness", dur: "00:41:46", desc: "The King of Ur receives a key witness to be able to accuse his wife of treason.", thumb: "https://static.wixstatic.com/media/859174_89e2d5ec3ac84937849b6d3cac362763~mv2.jpg", url: "https://ok.ru/videoembed/8520163527184" },
  { id: 40, title: "Youth", dur: "00:42:53", desc: "Abraham is now a young man and does not meet the expectations of his father Terah. Nahor is a rebellious youth.", thumb: "https://static.wixstatic.com/media/859174_62d406dd58b04b8d96225d94a3869a2e~mv2.jpg", url: "https://ok.ru/videoembed/8520163658256" },
  { id: 41, title: "Love With Benefits", dur: "00:43:09", desc: "Abraham tells his father he wants to marry Sarah, but he replies that she has nothing.", thumb: "https://static.wixstatic.com/media/859174_78091a18af9f40f4b1cf465aed6e5995~mv2.jpg", url: "https://ok.ru/videoembed/8520163854864" },
  { id: 42, title: "The Third Time", dur: "00:43:07", desc: "Morabi's accomplices put poison in Kissare's bed and he dies poisoned.", thumb: "https://static.wixstatic.com/media/859174_b6aebdd084bc483ba65a860e0a28f295~mv2.jpg", url: "https://ok.ru/videoembed/8549132929552" },
  { id: 43, title: "Looking For Someone To Blame", dur: "00:43:03", desc: "Dnin Sim, the heir of Ur, refuses to think that his master is the traitor of the kingdom.", thumb: "https://static.wixstatic.com/media/859174_d98806cb671946f085ff53bae7377195~mv2.jpg", url: "https://ok.ru/videoembed/8554816997904" },
  { id: 44, title: "Disappointments", dur: "00:42:39", desc: "Terah feels disappointed in all his children, as he feels that none of them think about the future.", thumb: "https://static.wixstatic.com/media/859174_b914f9421c314013a6648acd7afb6d6d~mv2.jpg", url: "https://ok.ru/videoembed/8556646763024" },
  { id: 45, title: "Unforgivable", dur: "00:44:19", desc: "Dnin Sim cannot believe that his father killed his mentor and does not plan to forgive that mistake.", thumb: "https://static.wixstatic.com/media/859174_b69ef528d2564b3aba4fbb35e55a48e5~mv2.jpg", url: "https://ok.ru/videoembed/8556646828560" },
  { id: 46, title: "The Succession", dur: "00:42:40", desc: "Haran, Terah's second son, will be his new heir and he teaches him everything he should know.", thumb: "https://static.wixstatic.com/media/859174_56c54a373cb3410bbdc3695a8405bc56~mv2.jpg", url: "https://ok.ru/videoembed/8556647287312" },
  { id: 47, title: "A New Chapter", dur: "00:43:20", desc: "Abraham works with ceramics and is happy being by Sarah's side despite the rejection.", thumb: "https://static.wixstatic.com/media/859174_24fc049c298f415a98989861efcdb938~mv2.jpg", url: "https://ok.ru/videoembed/8570161203728" },
  { id: 48, title: "Relative Success", dur: "00:42:56", desc: "Amat goes to visit Haran to tell him to reflect on things and focus on what is important.", thumb: "https://static.wixstatic.com/media/859174_d7c1453926994d6ba1b0dede3974e3bf~mv2.jpg", url: "https://ok.ru/videoembed/8570161334800" },
  { id: 49, title: "Deep Mourning", dur: "00:42:48", desc: "Haran's funeral is held and the king of Ur orders 21 days of mourning.", thumb: "https://static.wixstatic.com/media/859174_b0c7558dc845455f9676e0ccf93e1eda~mv2.jpg", url: "https://ok.ru/videoembed/8572575681040" },
  { id: 50, title: "The Invasion", dur: "00:43:08", desc: "The Elamites invade the kingdom of Ur and the battle between the armies is epic.", thumb: "https://static.wixstatic.com/media/859174_fad82a9a70b14cdbbfee2364d6518017~mv2.jpg", url: "https://ok.ru/videoembed/8572576008720" },
  { id: 51, title: "Doubting The Gods", dur: "00:43:00", desc: "Abraham is now an adult and begins to feel uncomfortable with the figures of the gods.", thumb: "https://static.wixstatic.com/media/859174_2a445413057a4f9bb5baee811007535a~mv2.jpg", url: "https://ok.ru/videoembed/8572576205328" },
  { id: 52, title: "The Fire", dur: "00:42:50", desc: "While throwing a party, Terah's house catches fire because of some bandits.", thumb: "https://static.wixstatic.com/media/859174_987750ef18df440d99a987c8d79d437f~mv2.jpg", url: "https://ok.ru/videoembed/8591906900496" },
  { id: 53, title: "A New Destination", dur: "00:42:22", desc: "After the fire at his house, Terah decides to leave Ur with Canaan as his destination.", thumb: "https://static.wixstatic.com/media/859174_cbfb83be62ef48b7ad789c3eac4066db~mv2.jpg", url: "https://ok.ru/videoembed/8594135452176" },
  { id: 54, title: "Learning", dur: "00:43:00", desc: "Hagar will have to adapt to palace life in Egypt and learn its customs.", thumb: "https://static.wixstatic.com/media/859174_d5b086b8ddaa43b18ebeec9c4ba4f7f3~mv2.jpg", url: "https://ok.ru/videoembed/8599058188816" },
  { id: 55, title: "Youthful Madness", dur: "00:42:17", desc: "Three young people from the village where Terah and his people arrived decide to steal milk.", thumb: "https://static.wixstatic.com/media/859174_444e73396b1c487e893f472050367411~mv2.jpg", url: "https://ok.ru/videoembed/8606142368272" },
  { id: 56, title: "Divine Message", dur: "00:43:01", desc: "After 2 years, Terah manages to make the settlement grow. Abraham receives a message from God.", thumb: "https://static.wixstatic.com/media/859174_12dd1c8e2e5845c5b169f89714ae3098~mv2.jpg", url: "https://ok.ru/videoembed/8756755302928" },
  { id: 57, title: "A Risky Plan", dur: "00:43:09", desc: "Abraham begins to organize his departure, but several people from Haran want to follow him.", thumb: "https://static.wixstatic.com/media/859174_5dc5720f58d8472b913f84c91ecdd84f~mv2.jpg", url: "https://ok.ru/videoembed/875675565072" },
  { id: 58, title: "Bloody Scene", dur: "00:41:16", desc: "On their way, Abraham and his followers come across a murdered family.", thumb: "https://static.wixstatic.com/media/859174_fd60d9d896024cac8bd9bc25f409731c~mv2.jpg", url: "https://ok.ru/videoembed/8756755761680" },
  { id: 59, title: "No More Messages", dur: "00:43:15", desc: "Abraham is worried because he has not received any more messages from God to give him direction.", thumb: "https://static.wixstatic.com/media/859174_a2e5bb0d4a914c08a7710ee008903a5b~mv2.jpg", url: "https://ok.ru/videoembed/8756756023824" },
  { id: 60, title: "Keep Walking", dur: "00:41:41", desc: "By God's orders, Abraham tells his followers that they must continue on their path.", thumb: "https://static.wixstatic.com/media/859174_071a3992c2824fa5a093a5920ecd46d4~mv2.jpg", url: "https://ok.ru/videoembed/8756756417040" },
  { id: 61, title: "Arrival In Egypt", dur: "00:42:09", desc: "Abraham and his followers arrive in Egypt and ask the general to let them settle there.", thumb: "https://static.wixstatic.com/media/859174_250cde97d0f9488cad04a39edc4c9142~mv2.jpg", url: "https://ok.ru/videoembed/8756756679184" },
  { id: 62, title: "Unmatched Beauty", dur: "00:43:09", desc: "General Bakari wants to remedy his mistakes and decides to bring a woman to the pharaoh.", thumb: "https://static.wixstatic.com/media/859174_23677e8d5aa44bc2942f9fd25bbb9372~mv2.jpg", url: "https://ok.ru/videoembed/8756756875792" },
  { id: 63, title: "False Sister", dur: "00:42:30", desc: "Abraham gives Sarah to the pharaoh, as he had no other choice to protect his group.", thumb: "https://static.wixstatic.com/media/859174_eb6a8218c12743caa70f9a253420f677~mv2.jpg", url: "https://ok.ru/videoembed/8756757334544" },
  { id: 64, title: "To Be A Queen", dur: "00:42:45", desc: "The pharaoh is struck by Sarah's beauty and tells her she can be the queen of Egypt.", thumb: "https://static.wixstatic.com/media/859174_0c72f3c869e54eb78847e7cffcccb10b~mv2.jpg", url: "https://ok.ru/videoembed/8756757727760" },
  { id: 65, title: "Ask For Mercy", dur: "00:42:49", desc: "Sarah intervenes with the pharaoh so that her nephew will not be punished for the murder.", thumb: "https://static.wixstatic.com/media/859174_5ba7ac7371dd42a68ac3c1446782920f~mv2.jpg", url: "https://ok.ru/videoembed/8756757924368" },
  { id: 66, title: "Unbearable Pain", dur: "00:41:52", desc: "Abraham feels a lot of pain because he is going to allow Sarah to marry the pharaoh.", thumb: "https://static.wixstatic.com/media/859174_4ee1ae4e0c4e4359a042a5b2b60f6347~mv2.jpg", url: "https://ok.ru/videoembed/8756758186512" },
  { id: 67, title: "A Troubled Wedding", dur: "00:43:12", desc: "The wedding between Sarah and the pharaoh takes place, but something very strange happens.", thumb: "https://static.wixstatic.com/media/859174_50b0a554ae874405aff2ca6836130a15~mv2.jpg", url: "https://ok.ru/videoembed/8756980353552" },
  { id: 68, title: "Disease And Treason", dur: "00:41:35", desc: "The pharaoh has a strange disease and also learns that Sarah is Abraham's wife.", thumb: "https://static.wixstatic.com/media/859174_1afbefdb27114202bb770e32a9d9e23a~mv2.jpg", url: "https://ok.ru/videoembed/8756980615696" },
  { id: 69, title: "Separation", dur: "00:41:00", desc: "Lot asks his uncle Abraham to separate their herds, as he has never had anything of his own.", thumb: "https://static.wixstatic.com/media/859174_da3ab92520634ab184cce4528da06dfb~mv2.jpg", url: "https://ok.ru/videoembed/8756981008912" },
  { id: 70, title: "Divided", dur: "00:42:24", desc: "Everyone prepares for the split between Lot's caravan and Abraham's.", thumb: "https://static.wixstatic.com/media/859174_05e900292bfc48b38a09022c2802384b~mv2.jpg", url: "https://ok.ru/videoembed/8773260872208" },
  { id: 71, title: "Keep Moving", dur: "00:41:48", desc: "Abraham spoke with God and tells his caravan that they must keep moving.", thumb: "https://static.wixstatic.com/media/859174_9ddabb73ea934d3087a22c02d5061603~mv2.jpg", url: "https://ok.ru/videoembed/8795376585232" },
  { id: 72, title: "True Rumors", dur: "00:42:06", desc: "Lot returns from Sodom to confirm that all the rumors about that city were true.", thumb: "https://static.wixstatic.com/media/859174_af08a7d7708f4921a7259fce8c911281~mv2.jpg", url: "https://ok.ru/videoembed/8795376978448" },
  { id: 73, title: "Baby In Arms", dur: "00:41:19", desc: "Massa decides to take Adalia's child in his arms and thus be able to threaten her.", thumb: "https://static.wixstatic.com/media/859174_d170024984e744cfa596babcf8023865~mv2.jpg", url: "https://ok.ru/videoembed/8795377109520" },
  { id: 74, title: "She Asks For War", dur: "00:42:29", desc: "The king of Sodom, forced by his wife, decides to go to war against Chedorlaomer.", thumb: "https://static.wixstatic.com/media/859174_fdf59cf096904e4f9f341d7cd6ae61ec~mv2.jpg", url: "https://ok.ru/videoembed/8806294161936" },
  { id: 75, title: "Low Odds", dur: "00:38:24", desc: "The king of Sodom goes to war, but he knows that his chances of success are few.", thumb: "https://static.wixstatic.com/media/859174_beb0a002fd68474b8ce636481316a262~mv2.jpg", url: "https://ok.ru/videoembed/8806294293008" },
  { id: 76, title: "War Has Arrived", dur: "00:41:24", desc: "A friend of Lot's who lived in Sodom tells him that they have definitely lost the war.", thumb: "https://static.wixstatic.com/media/859174_2e471f18cb0a473d9315efb1ecbe6042~mv2.jpg", url: "https://ok.ru/videoembed/8859250919952" },
  { id: 77, title: "For Old Times' Sake", dur: "00:40:07", desc: "Lot and his people are captured by Chedorlaomer and realize that Massa is alive.", thumb: "https://static.wixstatic.com/media/859174_ed46734a48ff47c7ba41a6019e2e8ab9~mv2.jpg", url: "https://ok.ru/videoembed/8859251116560" },
  { id: 78, title: "Surprise Attack", dur: "00:42:13", desc: "Abraham and his men take Chedorlaomer's camp by surprise.", thumb: "https://static.wixstatic.com/media/859174_357497e9d37740e881454778fbabae61~mv2.jpg", url: "https://ok.ru/videoembed/8859251378704" },
  { id: 79, title: "The Perfect Plan", dur: "00:39:59", desc: "Abraham shares with his men the plan with which he will seek to defeat Chedorlaomer.", thumb: "https://static.wixstatic.com/media/859174_3494e79ef3334e408c3de33e8cdf0e63~mv2.jpg", url: "https://ok.ru/videoembed/8859251771920" },
  { id: 80, title: "Difficult Forgiveness", dur: "00:39:17", desc: "Abraham managed to defeat Chedorlaomer's army and Massa was a key element.", thumb: "https://static.wixstatic.com/media/859174_ac7c347f7fac42ee9178a647a2f0b733~mv2.jpg", url: "https://ok.ru/videoembed/8859252099600" },
  { id: 81, title: "Return From The War", dur: "00:40:26", desc: "Abraham and his men return from the war, but not all the plunder was women.", thumb: "https://static.wixstatic.com/media/859174_3e03aa69f30b413c88cec9427cb02b2b~mv2.jpg", url: "https://ok.ru/videoembed/8863698848272" },
  { id: 82, title: "An Answer", dur: "00:40:46", desc: "Abraham thinks about what Sarah told him about not being able to give him a son and asks God what he will do.", thumb: "https://static.wixstatic.com/media/859174_e2712b60188844229659a65125a992ba~mv2.jpg", url: "https://ok.ru/videoembed/8863699044880" },
  { id: 83, title: "A Special Offering", dur: "00:42:10", desc: "God asks Abraham to make a special offering, but he does not realize that the evil one is spying on him.", thumb: "https://static.wixstatic.com/media/859174_2cdc13b735ba45959b978fb4949ce817~mv2.jpg", url: "https://ok.ru/videoembed/8863699372560" },
  { id: 84, title: "A Strange Family", dur: "00:39:29", desc: "Sarah tells Abraham her idea of forming a family: that Hagar should have his child.", thumb: "https://static.wixstatic.com/media/859174_eb27322957c14e6698068556e68d21ec~mv2.jpg", url: "https://ok.ru/videoembed/8863699569168" },
  { id: 85, title: "Decision Made", dur: "00:43:24", desc: "Sarah manages to convince Abraham to have Hagar bear his child. Abraham spends the night with Hagar.", thumb: "https://static.wixstatic.com/media/859174_25c989f4adb04e93b274e9aff5ea6159~mv2.jpg", url: "https://ok.ru/videoembed/8863699765776" },
  { id: 86, title: "Total Agony", dur: "00:42:29", desc: "With Hagar's pregnancy, everything has changed between her, Sarah, and Abraham, and now all three are unhappy.", thumb: "https://static.wixstatic.com/media/859174_4a7bce1f410f47aea77059d7ec8fcfb7~mv2.jpg", url: "https://ok.ru/videoembed/8863699896848" },
  { id: 87, title: "The Late Son", dur: "00:40:05", desc: "God speaks to Abraham again and tells him that Sarah should now be called Sarai.", thumb: "https://static.wixstatic.com/media/859174_7dc6a3b3d42647249b92c01eeab5b383~mv2.jpg", url: "https://ok.ru/videoembed/8883622382096" },
  { id: 88, title: "Incredulous", dur: "00:42:45", desc: "Sarah cannot believe that she is going to have a son at that age and prefers not to get her hopes up.", thumb: "https://static.wixstatic.com/media/859174_ca7b9733f4dd4b74bbc3000bc9ce5a5f~mv2.jpg", url: "https://ok.ru/videoembed/8883622644240" },
  { id: 89, title: "The Visitors", dur: "00:42:36", desc: "God appears in the camp with two companions. He announces that Sodom will be destroyed.", thumb: "https://static.wixstatic.com/media/859174_9086a4408c6444ada7ba569d3c3aa316~mv2.jpg", url: "https://ok.ru/videoembed/8883622906384" },
  { id: 90, title: "Old Loves", dur: "00:43:07", desc: "Nahor, Abraham's brother, goes to visit him to tell him that their father has died.", thumb: "https://static.wixstatic.com/media/859174_49e7d015848c4fdba6f7386725c74e85~mv2.jpg", url: "https://ok.ru/videoembed/8883623234064" },
  { id: 91, title: "The World Forsakes The Just", dur: "00:40:51", desc: "The world forsakes the righteous, but God does not, and Lot receives two of His envoys.", thumb: "https://static.wixstatic.com/media/859174_5d471f64db6242fdafecbddc44b71576~mv2.jpg", url: "https://ok.ru/videoembed/8892307671568" },
  { id: 92, title: "Without Looking Back", dur: "00:39:29", desc: "God's messengers warn that the city will not be saved. Lot tries to warn his family.", thumb: "https://static.wixstatic.com/media/859174_8b14b9f12908451ab8911dac49c7a359~mv2.jpg", url: "https://ok.ru/videoembed/8892307737104" },
  { id: 93, title: "Sodom And Gomorrah", dur: "00:40:32", desc: "Hagar waits for Sarah's rumor. Sarah ensures that Isaac will be the continuity of the covenant.", thumb: "https://static.wixstatic.com/media/859174_be775f3452244071ab75a8e2dcf2231d~mv2.jpg", url: "https://ok.ru/videoembed/8892307802640" },
  { id: 94, title: "Endless Night", dur: "00:39:50", desc: "In the search for Ishmael, Hagar reproaches Sarah for her loss. Hagar finds Ishmael alive.", thumb: "https://static.wixstatic.com/media/859174_01b27579a964492f966b7ae07a853365~mv2.jpg", url: "https://ok.ru/videoembed/8967893813776" },
  { id: 95, title: "A Piece Of Bronze", dur: "00:39:51", desc: "Abraham and his people arrive in Gerar and he must hide his wife Sarah.", thumb: "https://static.wixstatic.com/media/859174_14b9f3c66a3a4b87aceb638ab9424813~mv2.jpg", url: "https://ok.ru/videoembed/9037047925264" },
  { id: 96, title: "Offspring", dur: "00:38:46", desc: "Gaal proposes to Elisa. Abraham visits Queen Najia at the palace in Gerar.", thumb: "https://static.wixstatic.com/media/859174_1e143774d08a4f8a80acd2419dedae8c~mv2.jpg", url: "https://ok.ru/videoembed/9037049170448" },
  { id: 97, title: "Part Of The Harem", dur: "00:38:48", desc: "Abimelech becomes obsessed with Sarah. Abraham presents her as his sister and is forced to accept.", thumb: "https://static.wixstatic.com/media/859174_ba29cfedcbe44574bf694840d653b620~mv2.jpg", url: "https://ok.ru/videoembed/9166418872848" },
  { id: 98, title: "Scorpions", dur: "00:41:01", desc: "Sarah prepares to consume her stay in the harem. Adalia and Massa are stung.", thumb: "https://static.wixstatic.com/media/859174_6e284abd57474fd3ac80d420bb6e78f8~mv2.jpg", url: "https://ok.ru/videoembed/9166419724816" },
  { id: 99, title: "Cursed", dur: "00:39:33", desc: "Abimelech's harem loses its sons and cannot conceive. Abraham tries to get the king to release Sarah.", thumb: "https://static.wixstatic.com/media/859174_092facabef0a47dda929e428fc9ca870~mv2.jpg", url: "https://ok.ru/videoembed/9166421035536" },
  { id: 100, title: "A Son", dur: "00:39:36", desc: "Hagar confronts Ishmael and forbids him from attempting to kill Isaac. Abimelech releases Sarah.", thumb: "https://static.wixstatic.com/media/859174_6ad00fc986694644b9e5d9d9eaf56d1c~mv2.jpg", url: "https://ok.ru/videoembed/9166422280720" },
  { id: 101, title: "A Very Long Story", dur: "00:41:26", desc: "Ishmael despises his brother Isaac. Adalia warns Hagar to restrain her aggressiveness.", thumb: "https://static.wixstatic.com/media/859174_06bc60c0419d46d58b22e7d4b8d6c691~mv2.jpg", url: "https://ok.ru/videoembed/9420580391440" },
  { id: 102, title: "Spoiled", dur: "00:40:55", desc: "Ishmael confesses to Massa that he tried to kill him. Sarah has a confrontation with Hagar.", thumb: "https://static.wixstatic.com/media/859174_7ff68c1b0e2d404a8bd213dcf6913b55~mv2.jpg", url: "https://ok.ru/videoembed/9433941019152" },
  { id: 103, title: "God Sent It", dur: "00:40:21", desc: "Rafiki confronts Abraham. Sarah demands that Abraham expel Hagar and Ishmael.", thumb: "https://static.wixstatic.com/media/859174_7c929675c8324c32aed3d3a328f68907~mv2.jpg", url: "https://ok.ru/videoembed/9774022527504" },
  { id: 104, title: "Strengthening Alliances", dur: "00:41:49", desc: "Massa confronts Rafiki to recover the well. Abimelech visits the camp.", thumb: "https://static.wixstatic.com/media/859174_3456708fcdb64d4281cee6b232fafab8~mv2.jpg", url: "https://ok.ru/videoembed/9774023379472" },
  { id: 105, title: "A Time To Build", dur: "00:41:28", desc: "God lets Abraham know that Hagar and Ishmael will be fine. The years are benevolent.", thumb: "https://static.wixstatic.com/media/859174_89bfde6efcea4958ad104b3055cb1fb6~mv2.jpg", url: "https://ok.ru/videoembed/9774024559120" },
  { id: 106, title: "Your Only Son", dur: "00:42:11", desc: "Abraham trusts God's command and is tempted by Lucifer to have doubts about sacrificing his son.", thumb: "https://static.wixstatic.com/media/859174_5391ce117b674a56a3f3362d96691a37~mv2.jpg", url: "https://ok.ru/videoembed/9774027180560" },
  { id: 107, title: "The Love Of My Life", dur: "00:41:09", desc: "Abraham returns with his son. Sarah dies and Abraham asks the Hittites to let him bury her.", thumb: "https://static.wixstatic.com/media/859174_2dcf1a3e17c04a95bc284602f4bfc82e~mv2.jpg", url: "https://ok.ru/videoembed/9776581642768" },
  { id: 108, title: "A Special Woman", dur: "00:43:26", desc: "Hagar and Bakari meet again. Sarah is buried. Leora and Omar return after 15 years.", thumb: "https://static.wixstatic.com/media/859174_c0659b5dae9f475e83adcd4745af6fd4~mv2.jpg", url: "https://ok.ru/videoembed/9786622609936" },
  { id: 109, title: "Future Wife", dur: "00:42:23", desc: "Abraham confesses to Isaac that a woman from Nahor's lineage will be his wife.", thumb: "https://static.wixstatic.com/media/859174_5098fd0a55e24592888b7f49704a8f3c~mv2.jpg", url: "https://ok.ru/videoembed/9786624051728" },
  { id: 110, title: "Chosen By God", dur: "00:42:27", desc: "God points out to Eliezer that his chosen one to be Isaac's wife is Rebekah.", thumb: "https://static.wixstatic.com/media/859174_b94b4884829240c0a9f424d6738e4745~mv2.jpg", url: "https://ok.ru/videoembed/9787186678288" },
  { id: 111, title: "Lies That Can Destroy", dur: "00:41:35", desc: "Bethuel has doubts but Rebekah sets out on the journey with Eliezer. Uriala lies.", thumb: "https://static.wixstatic.com/media/859174_337e9a7de6f34e2aa62f83b013913529~mv2.jpg", url: "https://ok.ru/videoembed/10326065089040" },
  { id: 112, title: "Fulfilling The Promise", dur: "00:41:44", desc: "Isaac and Rebekah meet, guided towards their destiny. Uriala tries to get close again.", thumb: "https://static.wixstatic.com/media/859174_fc0b4787cb054e31a523091d8459236e~mv2.jpg", url: "https://ok.ru/videoembed/10326065220112" },
  { id: 113, title: "Resolved Intrigues", dur: "00:42:38", desc: "Uriala accepts marriage in exchange for Efron recovering Machpelah. Efron tries to get his land back.", thumb: "https://static.wixstatic.com/media/859174_1426ad88248c404ca0f3c06878c9d59b~mv2.jpg", url: "https://ok.ru/videoembed/10326065416720" },
  { id: 114, title: "The Father Is Gone", dur: "00:40:27", desc: "Ishmael returns to Abraham's lands and although cautious, he cannot avoid his resentment.", thumb: "https://static.wixstatic.com/media/859174_7537c0c097124c79a5d07214ef99ac9a~mv2.jpg", url: "https://ok.ru/videoembed/10326065547792" },
  { id: 115, title: "Two Nations", dur: "00:39:41", desc: "Abraham is buried next to Sarah, accompanied by Isaac and Ishmael.", thumb: "https://static.wixstatic.com/media/859174_a1b2c73199ac4911b291048996d9eb66~mv2.jpg", url: "https://ok.ru/videoembed/10326065678864" },
  { id: 116, title: "Twins", dur: "00:39:28", desc: "Laban confronts Bethuel for accusing the handmaids. Ishmael visits King Abimelech.", thumb: "https://static.wixstatic.com/media/859174_d42b0f441e59467090aadc02d9680bf4~mv2.jpg", url: "https://ok.ru/videoembed/10326065941008" },
  { id: 117, title: "Archers", dur: "00:42:48", desc: "Esau and Jacob are born. Ishmael challenges Micol as an archer and tries to cheat.", thumb: "https://static.wixstatic.com/media/859174_2e311e46eeee432f978a9d770b84dab1~mv2.jpg", url: "https://ok.ru/videoembed/10326066072080" },
  { id: 118, title: "A Competition Between Brothers", dur: "00:42:29", desc: "Laban forbids Leah from mingling with the servants. Uriala looks for her daughter Judith.", thumb: "https://static.wixstatic.com/media/859174_2f76ca636cad44eb8c570ecc208dbd94~mv2.jpg", url: "https://ok.ru/videoembed/10326066137616" },
  { id: 119, title: "The Worst Drought", dur: "00:39:41", desc: "Isaac's camp runs out of water. Esau demonstrates disinterest in others.", thumb: "https://static.wixstatic.com/media/859174_db06941c990340c5a5fb472bf61e0f15~mv2.jpg", url: "https://ok.ru/videoembed/10326066268688" },
  { id: 120, title: "Meanness", dur: "00:39:52", desc: "God asks Isaac not to go to Egypt, but to wander in this land. Isaac goes to Gerar.", thumb: "https://static.wixstatic.com/media/859174_51209f528d7344ea8fff16721471ee2e~mv2.jpg", url: "https://ok.ru/videoembed/10326066334224" },
  { id: 121, title: "Conspiracy", dur: "00:42:06", desc: "Abimelech recants, but asks to visit the camp and Isaac presents Rebekah as his sister.", thumb: "https://static.wixstatic.com/media/859174_128bcf6068184561a20fbb13ffa65ee8~mv2.jpg", url: "https://ok.ru/videoembed/10328168139280" },
  { id: 122, title: "Deceived", dur: "00:40:14", desc: "Ishmael visits Isaac and threatens to reveal the truth. Bachir has affairs with Hanna.", thumb: "https://static.wixstatic.com/media/859174_ada67f1273a241e3b80ac4ea2e4fd392~mv2.jpg", url: "https://ok.ru/videoembed/10328168335888" },
  { id: 123, title: "Envy", dur: "00:41:42", desc: "Abimelech confronts Isaac but forgives him. Bethuel tries to abuse Leah and is found dead.", thumb: "https://static.wixstatic.com/media/859174_3d19e8ebf96746c6a830da3e9ed36552~mv2.jpg", url: "https://ok.ru/videoembed/10328168466960" },
  { id: 124, title: "A Peace Alliance", dur: "00:42:10", desc: "Abimelech learns that Isaac's people have been persecuted and comes to visit him.", thumb: "https://static.wixstatic.com/media/859174_935c88c7c3214f6a902b76500b092d0a~mv2.jpg", url: "https://ok.ru/videoembed/10328168598032" },
  { id: 125, title: "Polar Opposites", dur: "00:40:10", desc: "Hanna arrives to live at the camp. Esau leads a life of partying and irresponsibility.", thumb: "https://static.wixstatic.com/media/859174_03134a1eae7849bfab055060c9e1db19~mv2.jpg", url: "https://ok.ru/videoembed/10328168663568" },
  { id: 126, title: "Madness", dur: "00:41:47", desc: "Esau feels he doesn't need God. Isaac continues to give preference to Esau.", thumb: "https://static.wixstatic.com/media/859174_8e717893cdec422f93d5acef64540391~mv2.jpg", url: "https://ok.ru/videoembed/10328168925712" },
  { id: 127, title: "The Destiny You Chose", dur: "00:42:31", desc: "Jacob deceives Isaac and manages to be blessed. Esau swears revenge against his brother.", thumb: "https://static.wixstatic.com/media/859174_58795716f25048ad80d7bb93c604151c~mv2.jpg", url: "https://ok.ru/videoembed/10328169253392" },
  { id: 128, title: "The Chosen One", dur: "00:39:37", desc: "Rebekah reveals God's command to Isaac. Esau promises to kill Jacob.", thumb: "https://static.wixstatic.com/media/859174_f0caecc3d75247e58f77e13db8e958fc~mv2.jpg", url: "https://ok.ru/videoembed/10328169384464" },
  { id: 129, title: "I Know You Will Watch Over Me", dur: "00:40:17", desc: "Esau pursues Jacob. Jacob manages to escape but is abandoned in the desert.", thumb: "https://static.wixstatic.com/media/859174_d4877cf95aa34eabaa07b4b7a6ee86cc~mv2.jpg", url: "https://ok.ru/videoembed/10328169974288" },
  { id: 130, title: "Against The Father", dur: "00:41:51", desc: "Isaac suffers because of the atrocities committed by Esau. Avner becomes Jacob's companion.", thumb: "https://static.wixstatic.com/media/859174_d33bab06bf14419396076a684024e237~mv2.jpg", url: "https://ok.ru/videoembed/10328170170896" },
  { id: 131, title: "Forbidden Proposition", dur: "00:41:25", desc: "Ishmael proposes that his daughter Mahaleth marry Esau. Leah rejects a suitor.", thumb: "https://static.wixstatic.com/media/859174_514cb5fa687742338c1e56aa257e958b~mv2.jpg", url: "https://ok.ru/videoembed/10328879598096" },
  { id: 132, title: "An Alternative of Faith", dur: "00:42:42", desc: "Leah meets Jacob, who speaks to her about his God. Esau has problems with his wives.", thumb: "https://static.wixstatic.com/media/859174_3da8e2931a4041e79d61fe27271378f1~mv2.jpg", url: "https://ok.ru/videoembed/10328170629648" },
  { id: 133, title: "Back In The Family", dur: "00:41:02", desc: "Jacob meets his family and there is an immediate attraction towards Rachel.", thumb: "https://static.wixstatic.com/media/859174_6aa643c5e0e84f2ba3c77feec1bc82b3~mv2.jpg", url: "https://ok.ru/videoembed/10328170826256" },
  { id: 134, title: "Disastrous Wedding Night", dur: "00:41:45", desc: "Esau and Mahaleth get married but realize they are physically incompatible.", thumb: "https://static.wixstatic.com/media/859174_1982b17fc33c4ff98f5ea8f1130c3799~mv2.jpg", url: "https://ok.ru/videoembed/10328170957328" },
  { id: 135, title: "Irresponsible Wedding", dur: "00:43:06", desc: "Judith's father complains to Esau about his daughter's suffering.", thumb: "https://static.wixstatic.com/media/859174_2421222b50444a06aca9930a53f8acea~mv2.jpg", url: "https://ok.ru/videoembed/10328171022864" },
  { id: 136, title: "The Real Reason", dur: "00:42:08", desc: "Leah hears the true reason for Jacob's arrival. Jacob proposes a plan to Laban.", thumb: "https://static.wixstatic.com/media/859174_f32c2184fe7f4cab9a7b0a604d89c1c0~mv2.jpg", url: "https://ok.ru/videoembed/10328171153936" },
  { id: 137, title: "Family Shame", dur: "00:42:39", desc: "A young woman is missing and Rachel doesn't care. Differences between Esau and Ishmael grow.", thumb: "https://static.wixstatic.com/media/859174_6be46e86c93d49a68a3b06599625abb6~mv2.jpg", url: "https://ok.ru/videoembed/10328171219472" },
  { id: 138, title: "The Seven Years", dur: "00:40:13", desc: "Seven years have passed. Jacob is ready to marry Rachel, but Laban has other plans.", thumb: "https://static.wixstatic.com/media/859174_94838aee72f7422ba7b64507e91db6a5~mv2.jpg", url: "https://ok.ru/videoembed/10328171350544" },
  { id: 139, title: "Conflict of Heirs", dur: "00:42:38", desc: "Esau is furious at Jacob's success. Reuel and Eliphaz are put to the test.", thumb: "https://static.wixstatic.com/media/859174_6a5e18548b4a4a77a79983d2a96c2792~mv2.jpg", url: "https://ok.ru/videoembed/10328171481616" },
  { id: 140, title: "Two Women", dur: "00:42:57", desc: "Wedding celebration. Esau decides on a very tough test for his heirs.", thumb: "https://static.wixstatic.com/media/859174_41e45ccfc04140ed87c0289387efcc1b~mv2.jpg", url: "https://ok.ru/videoembed/10328171612688" },
  { id: 141, title: "Victims of Deceit", dur: "00:41:53", desc: "Jacob spends the night with Leah, deceived by Laban. Rachel learns of the betrayal.", thumb: "https://static.wixstatic.com/media/859174_d1c5b4f54ec94a70bd2ee234a0d9bdf7~mv2.jpg", url: "https://ok.ru/videoembed/10330165479952" },
  { id: 142, title: "Negotiation of Marriages", dur: "00:41:17", desc: "Jacob talks with Laban to marry Rachel. Esau investigates his firstborn.", thumb: "https://static.wixstatic.com/media/859174_bb024ea99bcb447fb33aab6ca7a8c31b~mv2.jpg", url: "https://ok.ru/videoembed/10330165742096" },
  { id: 143, title: "True Love", dur: "00:39:12", desc: "Jacob finally marries Rachel. Leah suffers from her husband's absence.", thumb: "https://static.wixstatic.com/media/859174_b962ebf331ef46559d6e823404e4f317~mv2.jpg", url: "https://ok.ru/videoembed/10330165807632" },
  { id: 144, title: "Overwhelming Jealousy", dur: "00:41:09", desc: "Leah is pregnant with the firstborn. Rachel goes mad with jealousy. A sorceress arrives with Esau.", thumb: "https://static.wixstatic.com/media/859174_e6608c5b1b084c099f47943b70c2c3ef~mv2.jpg", url: "https://ok.ru/videoembed/10330165873168" },
  { id: 145, title: "The Sorceress", dur: "00:40:39", desc: "The sorceress promises Esau to tell him how to get rid of Jacob definitely.", thumb: "https://static.wixstatic.com/media/859174_57c22ae4779f4e64b2c6d070e2fd2d6c~mv2.jpg", url: "https://ok.ru/videoembed/10330165938704" },
  { id: 146, title: "Change of Attitude", dur: "00:41:59", desc: "Jacob gets closer to Leah. Esau's wives are intrigued by his change.", thumb: "https://static.wixstatic.com/media/859174_c3705230bf03496fa215af8361072947~mv2.jpg", url: "https://ok.ru/videoembed/10330166004240" },
  { id: 147, title: "All Joy", dur: "00:41:64", desc: "Leah's son is born. Rachel feels envious. The sorceress moves forward with her plan.", thumb: "https://static.wixstatic.com/media/859174_614c5a52286346b6b23441fca000ab79~mv2.jpg", url: "https://ok.ru/videoembed/10330166069776" },
  { id: 148, title: "A Strange Death", dur: "00:40:11", desc: "A shepherd dies strangely. The sorceress finds Mahaleth.", thumb: "https://static.wixstatic.com/media/859174_20fd3ffafb074cb8aa7fe1a72a9334b2~mv2.jpg", url: "https://ok.ru/videoembed/10330166135312" },
  { id: 149, title: "No More Consequences", dur: "00:41:56", desc: "Jacob does not want to put anyone else at risk. Isaac is fed up with Esau.", thumb: "https://static.wixstatic.com/media/859174_7f360d9074ce4e0f8d2e2928d2187b21~mv2.jpg", url: "https://ok.ru/videoembed/10330166266384" },
  { id: 150, title: "History Repeats Itself", dur: "00:40:23", desc: "Rachel asks Jacob to lie with Bilhah. The sorceress conquers Esau.", thumb: "https://static.wixstatic.com/media/859174_53a19cb4bebc42d1b86c3588449ef55f~mv2.jpg", url: "https://ok.ru/videoembed/10330166397456" },
  { id: 151, title: "Crazed Women", dur: "00:41:14", desc: "Jacob accepts Bilhah. Leah gets jealous and asks Jacob to accept Zilpah.", thumb: "https://static.wixstatic.com/media/859174_16f19e4c9687415fb6b09712944b29a9~mv2.jpg", url: "https://ok.ru/videoembed/10330166462992" },
  { id: 152, title: "Father of Everyone", dur: "00:42:13", desc: "Jacob works more years for Laban. Rachel asks God for her own son.", thumb: "https://static.wixstatic.com/media/859174_e9a570bfca5b4d98bac17eaa8ba795a8~mv2.jpg", url: "https://ok.ru/videoembed/10330166528528" },
  { id: 153, title: "The Approach", dur: "00:41:06", desc: "Esau reaches out to his father. Jacob makes a deal with Laban to continue prospering.", thumb: "https://static.wixstatic.com/media/859174_1a7b9045798146fbb1e531f9e30122d3~mv2.jpg", url: "https://ok.ru/videoembed/10330288359952" },
  { id: 154, title: "Prosperity", dur: "00:42:59", desc: "God gives great prosperity to Jacob. Esau does not work and the camp suffers.", thumb: "https://static.wixstatic.com/media/859174_237e076c90c0424596fa20fe0dc4bdd5~mv2.jpg", url: "https://ok.ru/videoembed/10330288425488" },
  { id: 155, title: "A Great Move", dur: "00:42:27", desc: "Jacob decides to return to Canaan by divine order. The evil one makes a deal with Laban.", thumb: "https://static.wixstatic.com/media/859174_8cbee3628d99436f9bbc6d6bf377624a~mv2.jpg", url: "https://ok.ru/videoembed/10331990788624" },
  { id: 156, title: "Clear Accounts", dur: "00:41:49", desc: "Laban pursues Jacob. They will have to negotiate their definitive separation.", thumb: "https://static.wixstatic.com/media/859174_29fbf08e67ed4127bc9fe2d48bda3bdd~mv2.jpg", url: "https://ok.ru/videoembed/10330452658704" },
  { id: 157, title: "Closer Than Ever", dur: "00:40:58", desc: "Jacob, distressed by the meeting with Esau, asks God for help. Esau comes with 400 men.", thumb: "https://static.wixstatic.com/media/859174_126d5df02ea440c6856797c8339d4f07~mv2.jpg", url: "https://ok.ru/videoembed/10330452724240" },
  { id: 158, title: "A Change", dur: "00:44:13", desc: "Esau and Jacob make peace. Jacob recognizes Leah's love.", thumb: "https://static.wixstatic.com/media/859174_59292774119048d385ab99a40bbc1ce1~mv2.jpg", url: "https://ok.ru/videoembed/10330452593168" },
  { id: 159, title: "A Restless Daughter", dur: "00:41:31", desc: "Dinah, Jacob's only daughter, is restless and decides to visit the neighboring city.", thumb: "https://static.wixstatic.com/media/859174_cadad575c9164377bee632910c9549e1~mv2.jpg", url: "https://ok.ru/videoembed/10330452789776" },
  { id: 160, title: "Responding With Honor", dur: "00:40:59", desc: "Shechem lies with Dinah but loves her. He visits Jacob to ask for her hand.", thumb: "https://static.wixstatic.com/media/859174_a52c617395564e568b7fd914278bdb83~mv2.jpg", url: "https://ok.ru/videoembed/10332017920528" },
  { id: 161, title: "Heading To Bethel", dur: "00:40:05", desc: "Israel heads to Bethel as commanded by God. Rachel dies after childbirth.", thumb: "https://static.wixstatic.com/media/859174_0f3d0a5c5fbb48cb8e662273e6d7e6ee~mv2.jpg", url: "https://ok.ru/videoembed/10332017986064" },
  { id: 162, title: "Future Patriarch", dur: "00:40:16", desc: "Israel has lost Leah. Reuben feels his place as heir is threatened.", thumb: "https://static.wixstatic.com/media/859174_809eb540b72b4e3e93a4e3826a58b416~mv2.jpg", url: "https://ok.ru/videoembed/10332018313744" },
  { id: 163, title: "The Family Leader", dur: "00:41:25", desc: "Joseph's brothers mistreat him. Israel decides that Joseph shall be the leader.", thumb: "https://static.wixstatic.com/media/859174_8b17008969d54d4a850223946241a2dc~mv2.jpg", url: "https://ok.ru/videoembed/10332018510352" },
  { id: 164, title: "The Dream", dur: "00:42:49", desc: "Joseph reveals his dream and is rebuked by Israel and mocked by his brothers.", thumb: "https://static.wixstatic.com/media/859174_fc874e552d51481abdcec35079764bb5~mv2.jpg", url: "https://ok.ru/videoembed/10332018838032" },
  { id: 165, title: "The Evil One Lost Long Ago", dur: "00:41:31", desc: "Nash poisons the souls of Joseph's brothers. Sheshi is enraged.", thumb: "https://static.wixstatic.com/media/859174_074c55e74ecc44ea855db57e374c1ad8~mv2.jpg", url: "https://ok.ru/videoembed/10332019100176" },
  { id: 166, title: "Slave", dur: "00:42:22", desc: "Joseph's brothers sell him as a slave to the Ishmaelites. Asenath resists.", thumb: "https://static.wixstatic.com/media/859174_2af807e854464cb9aeb7e4685c4eb3b8~mv2.jpg", url: "https://ok.ru/videoembed/10332019296784" },
  { id: 167, title: "The Bloody Tunic", dur: "00:42:22", desc: "Joseph is forced into hard labor. The high priest warns of danger.", thumb: "https://static.wixstatic.com/media/859174_b1f9546cf3704ed996973ec6a18ad662~mv2.jpg", url: "https://ok.ru/videoembed/10332019427856" },
  { id: 168, title: "I Will Never Forget It", dur: "00:42:28", desc: "His sons lead Israel to believe that a wild beast ate Joseph.", thumb: "https://static.wixstatic.com/media/859174_266220a0ce7b4b1fa72aeda6fc3ea102~mv2.jpg", url: "https://ok.ru/videoembed/10332019558928" },
  { id: 169, title: "The Pharaoh Of Egypt", dur: "00:41:38", desc: "Abumani and Joseph make a pact. Israel flees to the desert in profound pain.", thumb: "https://static.wixstatic.com/media/859174_0de88cd8964b4a1ab4afac05566f6d2e~mv2.jpg", url: "https://ok.ru/videoembed/10332020017680" },
  { id: 170, title: "The Archer", dur: "00:42:13", desc: "Merianat is wounded. Israel demands that Reuben bring Joseph back.", thumb: "https://static.wixstatic.com/media/859174_127c9f2b64a145c097e36bdc4fffdea8~mv2.jpg", url: "https://ok.ru/videoembed/10332020410896" },
  { id: 171, title: "I Am Hebrew", dur: "00:40:40", desc: "The merchant shaves Joseph. Israel suffers from not finding his son's body.", thumb: "https://static.wixstatic.com/media/859174_2dab2bc53b21465ea04bc181b6d72046~mv2.jpg", url: "https://ok.ru/videoembed/10332021393936" },
  { id: 172, title: "Son of a Rich Father", dur: "00:41:43", desc: "Potiphar discovers Asenath's plans. Judah decides to leave the camp.", thumb: "https://static.wixstatic.com/media/859174_b4a1f57c30b84342948a2f9b8d65eccc~mv2.jpg", url: "https://ok.ru/videoembed/10332021721616" },
  { id: 173, title: "Accomplice", dur: "00:42:57", desc: "Dinah rejects Anamel. Eri is assigned to teach Asenath a lesson.", thumb: "https://static.wixstatic.com/media/859174_9742269f86744bf09b1e146db066df4f~mv2.jpg", url: "https://ok.ru/videoembed/10332021852688" },
  { id: 174, title: "Baker", dur: "00:41:48", desc: "Neferiatis despises Joseph. Amarilis shows Potiphar Apepi's message.", thumb: "https://static.wixstatic.com/media/859174_006ad833cae7499faa18b7728928d7a3~mv2.jpg", url: "https://ok.ru/videoembed/10332022114832" },
  { id: 175, title: "You Are Seeing Things That Don't Exist", dur: "00:42:52", desc: "Potiphar searches the Harem. Joseph demonstrates his integrity in Potiphar's house.", thumb: "https://static.wixstatic.com/media/859174_7f511784714349669a921d187a57d100~mv2.jpg", url: "https://ok.ru/videoembed/10332022180368" },
  { id: 176, title: "My Little One", dur: "00:40:43", desc: "Amarilis is dying. Atarum must report to the palace for a test.", thumb: "https://static.wixstatic.com/media/859174_9cd1891378d14914a1d2ba97ee4a0153~mv2.jpg", url: "https://ok.ru/videoembed/10332141586960" },
  { id: 177, title: "Trusted Man", dur: "00:42:17", desc: "Judah settles in Adullam. Joseph continues to prosper in everything he does.", thumb: "https://static.wixstatic.com/media/859174_22d1affd5c104aea9cc0b13ca92e6731~mv2.jpg", url: "https://ok.ru/videoembed/10332142111248" },
  { id: 178, title: "Suspicions", dur: "00:41:18", desc: "Potiphar tells Pharaoh about his suspicions. Neferiatis asks Joseph to organize a party.", thumb: "https://static.wixstatic.com/media/859174_62641762b8c343b88888f9bb0f989b7a~mv2.jpg", url: "https://ok.ru/videoembed/10332318206480" },
  { id: 179, title: "Innocent", dur: "00:42:27", desc: "Kamesha is exiled. Joseph suffers learning Asenath's fate.", thumb: "https://static.wixstatic.com/media/859174_5169055bf83643e3b3520440732ef3bc~mv2.jpg", url: "https://ok.ru/videoembed/10332318272016" },
  { id: 180, title: "Awakening Temptation", dur: "00:42:21", desc: "Atarum and Shareder get the vacancy. Muriel ruins Judah's plans.", thumb: "https://static.wixstatic.com/media/859174_9ae837fec5e94a59bcb9a6c8e462eb60~mv2.jpg", url: "https://ok.ru/videoembed/10332318468624" },
  { id: 181, title: "A Mistake", dur: "00:40:31", desc: "Neferiatis has dreams about Joseph. Muriel proposes marriage to Judah.", thumb: "https://static.wixstatic.com/media/859174_2f33689c630444be9d5f9056cf1b86de~mv2.jpg", url: "https://ok.ru/videoembed/10337738557968" },
  { id: 182, title: "The Family", dur: "00:41:07", desc: "Adurah shows interest in Asenath. Abumani causes an encounter between Joseph and Asenath.", thumb: "https://static.wixstatic.com/media/859174_7dcea61e7ece40eab943eaf7b5fbf2b1~mv2.jpg", url: "https://ok.ru/videoembed/10337738689040" },
  { id: 183, title: "Nightmares", dur: "00:41:20", desc: "Israel asks Judah to stay with his wife. Adurah asks for Asenath's hand.", thumb: "https://static.wixstatic.com/media/859174_b67a1753db2a4171b2ed4925e8071aca~mv2.jpg", url: "https://ok.ru/videoembed/10337738885648" },
  { id: 184, title: "Possessive", dur: "00:41:35", desc: "Merianath is consoled by Shetep. Eri reproaches Shareder for his abandonment.", thumb: "https://static.wixstatic.com/media/859174_cbb833aa3ccb4d58bb1549054fb7457b~mv2.jpg", url: "https://ok.ru/videoembed/10337739016720" },
  { id: 185, title: "To Prevent A War", dur: "00:41:56", desc: "Asenath humiliates Joseph out of jealousy. Muriel reproaches Judah for his alcoholism.", thumb: "https://static.wixstatic.com/media/859174_25fdbb96b5e9452f8371ce1b743214fa~mv2.jpg", url: "https://ok.ru/videoembed/10337739082256" },
  { id: 186, title: "The Reflection", dur: "00:39:41", desc: "Joseph does not recognize who he is nor tries to return to Canaan. Pharaoh is determined.", thumb: "https://static.wixstatic.com/media/859174_d2eadbdcf9e746059c6ccac6d68c732f~mv2.jpg", url: "https://ok.ru/videoembed/10337739344400" },
  { id: 187, title: "Persistent Seduction", dur: "00:42:17", desc: "Neferiatis insists on seducing Joseph in every possible way, but he rejects her.", thumb: "https://static.wixstatic.com/media/859174_e8585c0098554d85a69c31ee714acbb9~mv2.jpg", url: "https://ok.ru/videoembed/10337739409936" },
  { id: 188, title: "Permission To Escape", dur: "00:41:31", desc: "Joseph asks Potiphar's permission to leave, always with the hidden intention of escaping.", thumb: "https://static.wixstatic.com/media/859174_efac71d5ebe74587aac50b54208a5ae7~mv2.jpg", url: "https://ok.ru/videoembed/10337739475472" },
  { id: 189, title: "Desire And Lies", dur: "00:41:56", desc: "Neferiatis lies saying that Joseph tried to rape her. Joseph is sent to prison.", thumb: "https://static.wixstatic.com/media/859174_10cf3c9b4a8241a0b4c77644694daa1a~mv2.jpg", url: "https://ok.ru/videoembed/10337739737616" },
  { id: 190, title: "Escape Team", dur: "00:41:47", desc: "Abumani plans the escape from Egypt. The evil one approaches Joseph in prison.", thumb: "https://static.wixstatic.com/media/859174_c43a33ac0a544c429c7a14ecb5390872~mv2.jpg", url: "https://ok.ru/videoembed/10337739803152" },
  { id: 191, title: "A Great Favor", dur: "00:41:19", desc: "Asenath asks Teruel to help her escape. Joseph looks for alternatives.", thumb: "https://static.wixstatic.com/media/859174_fc126b458f3c4474872569c7b84ce80c~mv2.jpg", url: "https://ok.ru/videoembed/10337739934224" },
  { id: 192, title: "In The Shadows", dur: "00:41:48", desc: "The enemies of the palace prepare their move. Neferiatis's lie becomes evident.", thumb: "https://static.wixstatic.com/media/859174_539e06c4ff1e4cacbddaa757072a8800~mv2.jpg", url: "https://ok.ru/videoembed/10337740065296" },
  { id: 193, title: "False Accusation", dur: "00:41:29", desc: "Potiphar decides to delay the trial. Atarum is discovered as the pharaoh's traitor.", thumb: "https://static.wixstatic.com/media/859174_95af3b5d93854460a42141fe766946a3~mv2.jpg", url: "https://ok.ru/videoembed/10337740261904" },
  { id: 194, title: "Postponed Business", dur: "00:41:38", desc: "Potiphar gives Asenath permission to leave Egypt. Joseph receives news from his family.", thumb: "https://static.wixstatic.com/media/859174_011925f9c24844f8b112e4c8c6981b7f~mv2.jpg", url: "https://ok.ru/videoembed/10337740458512" },
  { id: 195, title: "Two More Years", dur: "00:41:39", desc: "Two years pass and Joseph remains a prisoner. Pharaoh prepares a counterattack.", thumb: "https://static.wixstatic.com/media/859174_af48a50b1b2a46f4a19e4fe67e256b7b~mv2.jpg", url: "https://ok.ru/videoembed/10337740589584" },
  { id: 196, title: "Lack of Interpretation", dur: "00:40:34", desc: "Pharaoh looks for someone to decipher his dreams. They inform him that Joseph can help him.", thumb: "https://static.wixstatic.com/media/859174_e72a902e653a4b068db1d84bbb9c69c2~mv2.jpg", url: "https://ok.ru/videoembed/10337740851728" },
  { id: 197, title: "Dream Translator", dur: "00:42:54", desc: "Joseph interprets the dream and becomes governor. Potiphar discovers the infidelity.", thumb: "https://static.wixstatic.com/media/859174_c7c01ea8c2c4417986a797f21a15fee7~mv2.jpg", url: "https://ok.ru/videoembed/10337740917264" },
  { id: 198, title: "Double Execution", dur: "00:40:36", desc: "Neferiatis and Teruel receive their punishment. The enemies attempt a new attack.", thumb: "https://static.wixstatic.com/media/859174_4e7419a7a86849738d3d534d60ceef82~mv2.jpg", url: "https://ok.ru/videoembed/10337741048336" },
  { id: 199, title: "Strange Love", dur: "00:42:12", desc: "Joseph and Asenath reject each other despite their love. Adurah joins the pharaoh's men.", thumb: "https://static.wixstatic.com/media/859174_df8f20d80dd54b33aa63e546bf9b778f~mv2.jpg", url: "https://ok.ru/videoembed/10337741310480" },
  { id: 200, title: "Kidnapping Announcement", dur: "00:41:27", desc: "Joseph warns about the famine. Apepi kidnaps Asenath to harm Egypt.", thumb: "https://static.wixstatic.com/media/859174_62bda78381904a909eff4ac5eba249ba~mv2.jpg", url: "https://ok.ru/videoembed/10337741507088" },
  { id: 201, title: "Vote of Confidence", dur: "00:41:03", desc: "Joseph trusts Kaires. The pharaoh's son is kidnapped by Apepi.", thumb: "https://static.wixstatic.com/media/859174_4d9b21c7709c4596ac8d9dc912ff5e7b~mv2.jpg", url: "https://ok.ru/videoembed/10340357179920" },
  { id: 202, title: "Yielding To Love", dur: "00:41:30", desc: "Joseph and Asenath decide to yield to their love. Suspicions about Adurah grow.", thumb: "https://static.wixstatic.com/media/859174_9d48d1f661404fb8a8f7002e67fb6ffc~mv2.jpg", url: "https://ok.ru/videoembed/10340357245456" },
  { id: 203, title: "Time To Run", dur: "00:41:22", desc: "Teruel and Adurah are pursued as traitors. Pharaoh investigates everyone.", thumb: "https://static.wixstatic.com/media/859174_450655acc60849a18c9328bf8ce91054~mv2.jpg", url: "https://ok.ru/videoembed/10340357310992" },
  { id: 204, title: "A Growing Friendship", dur: "00:41:38", desc: "The friendship between Joseph and Abumani grows. Asenath prepares to be a mother.", thumb: "https://static.wixstatic.com/media/859174_13236c763ffe449f84a8bd2f8b1e326a~mv2.jpg", url: "https://ok.ru/videoembed/10340357769744" },
  { id: 205, title: "It Is Not The Time", dur: "00:40:05", desc: "Manasseh is born. Joseph knows that times of famine are approaching.", thumb: "https://static.wixstatic.com/media/859174_787f43c614374208835ef785542e5155~mv2.jpg", url: "https://ok.ru/videoembed/10340357966352" },
  { id: 206, title: "Violent Marriage", dur: "00:40:02", desc: "The marriage of Er and Tamar is a failure. Tamar suffers continuous humiliations.", thumb: "https://static.wixstatic.com/media/859174_c0262be52392445cbda6a230704d66b9~mv2.jpg", url: "https://ok.ru/videoembed/10340358228496" },
  { id: 207, title: "Quick Solution", dur: "00:40:58", desc: "The whole family suffers the death of Er. Joseph remembers his childhood in Canaan.", thumb: "https://static.wixstatic.com/media/859174_79ef2425d5f243daa48088ec3ecd730a~mv2.jpg", url: "https://ok.ru/videoembed/10340358425104" },
  { id: 208, title: "The Best Decision", dur: "00:40:38", desc: "Judah marries Onan to Tamar. Something strange happens during the union.", thumb: "https://static.wixstatic.com/media/859174_351625059d564c7eb1c99af2bc988eaa~mv2.jpg", url: "https://ok.ru/videoembed/10340358490640" },
  { id: 209, title: "The Best Decision", dur: "00:41:23", desc: "Judah sends Tamar with her family. Muriel remains devastated by the loss.", thumb: "https://static.wixstatic.com/media/859174_d4248b6368fc4af9ab75fb5bfd075c3a~mv2.jpg", url: "https://ok.ru/videoembed/10340358687248" },
  { id: 210, title: "The Past Weighs Heavily", dur: "00:42:32", desc: "Bilhah suffers for her infidelity. Tamar plans to reclaim her rights.", thumb: "https://static.wixstatic.com/media/859174_777758bac8e24addb38a5b6c1b261884~mv2.jpg", url: "https://ok.ru/videoembed/10340358818320" },
  { id: 211, title: "Cursed Pregnancy", dur: "00:42:45", desc: "Judah learns of Tamar's pregnancy. Tamar's son is the fruit of deceit.", thumb: "https://static.wixstatic.com/media/859174_1a8e5b948b37444781ddef1315c9158a~mv2.jpg", url: "https://ok.ru/videoembed/10340359146000" },
  { id: 212, title: "Let Bygones Be Bygones", dur: "00:42:19", desc: "Judah returns to his land. Tamar is afraid of how she will be received.", thumb: "https://static.wixstatic.com/media/859174_c2aa8eea90de4d90bdbe3710df24cca8~mv2.jpg", url: "https://ok.ru/videoembed/10340359539216" },
  { id: 213, title: "The Famine", dur: "00:42:30", desc: "There is no food in neighboring territories. Joseph knows the famine is spreading.", thumb: "https://static.wixstatic.com/media/859174_de1cfdc22b5e41eca0d1b74d760cb270~mv2.jpg", url: "https://ok.ru/videoembed/10340359342608" },
  { id: 214, title: "Resentment Over Kindness", dur: "00:44:10", desc: "Joseph sees his brothers again in Egypt. They do not recognize him.", thumb: "https://static.wixstatic.com/media/859174_0920a85d8b854d3d8be404e132ce7518~mv2.jpg", url: "https://ok.ru/videoembed/10340359670288" },
  { id: 215, title: "Honest Reaction", dur: "00:43:40", desc: "Joseph wants to know if his brothers' repentance is real.", thumb: "https://static.wixstatic.com/media/859174_1072b72e12b34785a017eae7494fed11~mv2.jpg", url: "https://ok.ru/videoembed/10340359735824" },
  { id: 216, title: "More Food", dur: "00:42:46", desc: "The brothers return to Egypt. Joseph suffers because of everything he lived through.", thumb: "https://static.wixstatic.com/media/859174_db99e47a0e254e87af912d7f922ff287~mv2.jpg", url: "https://ok.ru/videoembed/10340359801360" },
  { id: 217, title: "Impossible Punishment", dur: "00:43:06", desc: "Joseph sets a trap to retain Benjamin. Reuben begs for mercy.", thumb: "https://static.wixstatic.com/media/859174_e49c50ee66474dab83dcf0d4ca148219~mv2.jpg", url: "https://ok.ru/videoembed/10340359932432" },
  { id: 218, title: "New Settlers", dur: "00:39:33", desc: "Joseph asks Pharaoh for permission for his family to live in Egypt.", thumb: "https://static.wixstatic.com/media/859174_6d043dafd6644d908f065230bad97fd0~mv2.jpg", url: "https://ok.ru/videoembed/10340360194576" },
  { id: 219, title: "Before Dying", dur: "00:43:40", desc: "Israel learns that Joseph is alive. Everyone prepares for the move.", thumb: "https://static.wixstatic.com/media/859174_96f482dc4ea0452dbecb5a2e2f2aed42~mv2.jpg", url: "https://ok.ru/videoembed/10340360391184" },
  { id: 220, title: "Necessary Caress", dur: "00:42:00", desc: "Israel arrives in Egypt and the meeting with Joseph is emotional and necessary.", thumb: "https://static.wixstatic.com/media/859174_e26b65ee655a40f48a00fb5efdffe2fe~mv2.jpg", url: "https://ok.ru/videoembed/10340360653328" },
  { id: 221, title: "All United", dur: "00:43:54", desc: "Wedding with all the men of Israel in Egypt. End of the story of Genesis.", thumb: "https://static.wixstatic.com/media/859174_ac6e61ae8f7b46fd91b24fe79a1b6cda~mv2.jpg", url: "https://ok.ru/videoembed/10340360915472" }
];

const GenesisEN_PC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const SERIES_ID = 1; // ID de Genesis en versión inglés

  useEffect(() => {
    // --- BLINDAJE TOTAL ---
    const handleGlobalPrevent = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', handleGlobalPrevent);
    document.addEventListener('dragstart', handleGlobalPrevent);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'i')) || (e.metaKey && (e.key === 'u' || e.key === 's' || e.key === 'i')) || e.key === 'F12') {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Cargar último episodio visto
    const savedEp = localStorage.getItem('en_genesis_last_ep');
    if (savedEp) {
      const idx = parseInt(savedEp);
      if (idx < genesisEpisodes.length) setCurrentIdx(idx);
    }

    const myListData = JSON.parse(localStorage.getItem('myList') || '[]');
    if (myListData.includes(SERIES_ID)) setInMyList(true);

    return () => {
      document.removeEventListener('contextmenu', handleGlobalPrevent);
      document.removeEventListener('dragstart', handleGlobalPrevent);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Buscador Internacional 100% Inglés
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
    setCurrentIdx(idx);
    setSelectedVideo(genesisEpisodes[idx].url);
    localStorage.setItem('en_genesis_last_ep', idx.toString());
  };

  const closePlayer = () => {
    setSelectedVideo(null);
    setTimeout(() => {
      episodeRefs.current[currentIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const toggleMyList = () => {
    let list = JSON.parse(localStorage.getItem('myList') || '[]');
    if (inMyList) {
      list = list.filter((i: number) => i !== SERIES_ID);
      setInMyList(false);
    } else {
      list.push(SERIES_ID);
      setInMyList(true);
    }
    localStorage.setItem('myList', JSON.stringify(list));
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans select-none overflow-x-hidden text-left unselectable">
      <Head><title>Genesis — Estudios 421</title></Head>

      <nav className={`fixed top-0 w-full z-[130] transition-all duration-500 px-8 py-4 flex items-center justify-between ${isScrolled || searchQuery.length > 0 ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black via-black/60 to-transparent'}`}>
        <div className="flex items-center gap-10">
          <Link href="/en"><div className="relative w-[160px] h-[45px] cursor-pointer"><Image src="https://static.wixstatic.com/media/859174_bbede1754486446398ed23b19c40484e~mv2.png" alt="Logo" fill className="object-contain" priority /></div></Link>
          <div className="flex gap-8">
            <Link href="/en" className="relative group text-white text-[15px] font-medium tracking-wide">Home<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/en/biblical-series" className="relative group text-white text-[15px] font-medium tracking-wide">Biblical Series<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/en/tv-shows" className="relative group text-white text-[15px] font-medium tracking-wide">TV Shows<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
            <Link href="/en/movies" className="relative group text-white text-[15px] font-medium tracking-wide">Movies<span className="absolute -bottom-1 left-0 h-[3px] bg-[#FF8A00] transition-all duration-500 w-0 group-hover:w-full" /></Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 mr-4">
            {[{ n: '', img: '367960b11c1c44ba89cd1582fd1b5776' }, { n: 'en', img: '35112d9ffe234d6f9dcef16cf8f7544e' }, { n: 'pt', img: '830f1c20656e4d44a819bedfc13a22cc' }].map((l) => (
              <Link key={l.n} href={l.n === '' ? '/serie/genesis' : `/${l.n}/series/genesis`}><img src={`https://static.wixstatic.com/media/859174_${l.img}~mv2.png`} className="w-7 h-7 object-contain cursor-pointer hover:scale-110 transition-transform" /></Link>
            ))}
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-white/10 rounded-full px-4 py-1 border border-white/5 focus-within:border-[#FF8A00]">
            <IoSearchOutline className="text-white text-xl" />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm ml-2 w-32 placeholder:text-gray-400" />
          </form>
          <Image src="https://static.wixstatic.com/media/859174_26ca840644ce4f519c0458c649f44f34~mv2.png" alt="User" width={30} height={30} className="rounded-full ring-1 ring-white/20 hover:ring-[#FF8A00] cursor-pointer" />
        </div>
      </nav>

      {searchQuery.length > 0 && (
        <div className="fixed inset-0 bg-black z-[120] pt-24 px-16 overflow-y-auto pb-20">
          <h2 className="text-white text-2xl font-bold mb-10 uppercase tracking-widest flex items-center gap-3"><span className="w-1.5 h-6 bg-[#FF8A00]" />Results: "{searchQuery}"</h2>
          <div className="grid grid-cols-6 gap-x-4 gap-y-10">
            {searchResults.map((m) => (
              <Link key={m.id} href={m.path}><div className="relative aspect-[2/3] rounded-md transition-all duration-500 hover:scale-110 hover:z-[110] cursor-pointer shadow-2xl group"><Image src={m.banner} alt={m.title} fill className="object-cover rounded-md" unoptimized /></div></Link>
            ))}
          </div>
        </div>
      )}

      <div className="relative w-full h-[88vh]">
        <img src="https://static.wixstatic.com/media/859174_6a6ea45a256e4ce781e37c8adb173eec~mv2.jpg" className="w-full h-full object-cover" alt="Banner Genesis" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10 opacity-70" />
        <div className="absolute bottom-[-30px] left-16 flex gap-6 z-20 items-center">
          <button onClick={() => openEpisode(currentIdx)} className="bg-white text-black font-black py-4 px-12 rounded-sm text-lg hover:bg-[#FF8A00] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl uppercase tracking-wider">
            {currentIdx === 0 ? "▶ Watch Now" : `▶ Continue Ep. ${genesisEpisodes[currentIdx].id}`}
          </button>
          <button onClick={toggleMyList} className={`border py-4 px-10 rounded-sm transition-all uppercase font-bold ${inMyList ? 'bg-[#FF8A00] border-[#FF8A00] text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}>
            {inMyList ? <><IoCheckmarkCircle className="inline mr-2" /> In My List</> : '+ My List'}
          </button>
          <button onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=C2Y74BGQB4HKS', '_blank')} className="border py-4 px-10 rounded-sm bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all uppercase font-bold">❤ Donate</button>
        </div>
      </div>

      <div className="h-20 bg-black"></div>

      <div className="px-16 mb-32 relative z-10 text-left">
        <header className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <div className="w-1.5 h-8 bg-[#FF8A00]"></div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">Available Episodes</h2>
        </header>

        <div className="grid grid-cols-4 gap-8">
          {genesisEpisodes.map((ep, index) => (
            <div key={ep.id} ref={(el) => { episodeRefs.current[index] = el; }} className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 bg-[#2C2F33] border-2 ${currentIdx === index ? 'border-[#FF8A00] ring-4 ring-[#FF8A00]/20' : 'border-transparent hover:border-white/20 hover:shadow-2xl'}`} onClick={() => openEpisode(index)}>
              <div className="relative aspect-video overflow-hidden">
                <img src={ep.thumb} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 pointer-events-none" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2F33] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-2 left-2 flex items-center">
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md shadow-lg">
                    <span className="text-[11px] font-black uppercase text-white">Episode <span className="text-[#FF8A00]">{ep.id}</span></span>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 shadow-lg">
                  <span className="text-[10px] font-bold text-white tracking-widest tabular-nums">{ep.dur}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-1 text-left">
                <h3 className="font-bold text-base truncate uppercase transition-colors group-hover:text-[#FF8A00]">{ep.title}</h3>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed h-8">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[1000] bg-[#050608] flex flex-col animate-fade-in overflow-hidden">
          <div className="h-[12vh] min-h-[85px] px-12 flex items-center justify-between bg-gradient-to-b from-[#0a0b0d] to-[#050608] border-b border-white/5 relative shadow-2xl">
            <div className="flex items-center gap-8">
              <div className="flex flex-col border-l-4 border-[#FF8A00] pl-6 py-1 text-left">
                <span className="text-[10px] font-black text-[#FF8A00]/80 uppercase tracking-[0.5em] mb-1">Series: Genesis</span>
                <h2 className="text-2xl font-black tracking-tighter uppercase">Chapter {genesisEpisodes[currentIdx].id} <span className="text-white/10 mx-3">/</span> {genesisEpisodes[currentIdx].title}</h2>
              </div>
            </div>
            <button onClick={closePlayer} className="group flex items-center gap-4 bg-white/[0.03] px-8 py-3.5 rounded-full border border-white/10 hover:bg-[#FF8A00] hover:scale-105 transition-all">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-black">Exit Video</span>
              <span className="hidden">Salir del video</span>
              <IoClose className="text-2xl group-hover:rotate-90 group-hover:text-black transition-all" />
            </button>
          </div>
          <div className="flex-grow bg-black relative">
            <iframe src={selectedVideo + "?autoplay=1"} className="absolute inset-0 w-full h-full border-none" allow="autoplay; fullscreen" allowFullScreen />
          </div>
          <div className="h-[13vh] min-h-[100px] px-16 bg-gradient-to-t from-[#0a0b0d] to-[#050608] border-t border-white/5 flex items-center justify-between shadow-2xl">
            <button disabled={currentIdx === 0} onClick={() => openEpisode(currentIdx - 1)} className="group flex items-center gap-5 disabled:opacity-5 transition-all">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-all shadow-xl">
                <IoChevronBack className="text-xl" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]/60">Previous</span>
                <span className="text-sm font-bold uppercase text-white/80">Episode {currentIdx}</span>
              </div>
            </button>
            <button onClick={closePlayer} className="flex items-center gap-4 bg-white/[0.03] px-10 py-4 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all group scale-95 hover:scale-100">
              <IoList className="text-2xl text-[#FF8A00]" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Chapters</span>
            </button>
            <button disabled={currentIdx === genesisEpisodes.length - 1} onClick={() => openEpisode(currentIdx + 1)} className="group flex items-center gap-6 disabled:opacity-5 transition-all">
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF8A00]">Next</span>
                <span className="text-sm font-bold uppercase text-white/80">Episode {currentIdx + 2}</span>
              </div>
              <div className="w-16 h-16 rounded-[22px] bg-[#FF8A00] flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-all">
                <IoChevronForward className="text-4xl" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] text-gray-400 py-12 px-8 md:px-16 border-t border-white/5 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-start md:justify-end gap-6 mb-10">
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaFacebookF /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@estudios421_com?_r=1&_t=ZS-93K0Cjg8TzM" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaTiktok /></a>
            <a href="https://youtube.com/@estudios421max?si=IXSltDZuOmclG7KL" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaYoutube /></a>
            <a href="https://www.facebook.com/profile.php?id=61573132405808" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xl"><FaXTwitter /></a>
          </div>
          <div className="mb-10 space-y-4 text-left">
            <p className="text-xs leading-relaxed max-w-4xl">© {new Date().getFullYear()} Estudios 421. All rights reserved on the design and editing of the platform.</p>
            <p className="text-[10px] md:text-xs leading-relaxed text-gray-500 max-w-5xl text-justify">Legal Notice: The audiovisual content shared on this site belongs to its respective owners and production companies. Estudios 421 is a non-profit platform dedicated to the dissemination of biblical content for the community.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px] md:text-xs font-medium uppercase tracking-widest border-t border-white/5 pt-8">
            <Link href="/en/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/en/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/en/cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
            <Link href="/en/ads" className="hover:text-white transition-colors">Ad Specifications</Link>
            <Link href="/en/help" className="hover:text-white transition-colors">Help Center</Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .unselectable { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-touch-callout: none; }
        img { pointer-events: none !important; -webkit-user-drag: none !important; }
        body { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
      `}</style>
    </div>
  );
};

export default GenesisEN_PC;
