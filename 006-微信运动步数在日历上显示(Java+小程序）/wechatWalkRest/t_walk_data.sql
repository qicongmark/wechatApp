
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_walk_data
-- ----------------------------
DROP TABLE IF EXISTS `t_walk_data`;
CREATE TABLE `t_walk_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `kdate` int(11) DEFAULT NULL,
  `steps` int(11) DEFAULT NULL,
  `kms` decimal(11,2) DEFAULT '0.00',
  `caloris` decimal(11,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `year` (`year`),
  KEY `month` (`month`),
  KEY `kdate` (`kdate`)
) ENGINE=InnoDB AUTO_INCREMENT=560 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_daka_userinfo
-- ----------------------------
DROP TABLE IF EXISTS `t_walk_userinfo`;
CREATE TABLE `t_walk_userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `nickname` varchar(250) DEFAULT NULL,
  `avatarUrl` varchar(500) DEFAULT NULL,
  `avatarLocal` varchar(500) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `todaysteps` int(11) DEFAULT '0' COMMENT '今日步数',
  `steps` int(11) DEFAULT '0',
  `keepcount` int(11) DEFAULT '0',
  `preMonthKeepCount` int(11) DEFAULT '0',
  `monthKeepCount` int(11) DEFAULT '0',
  `kms` decimal(11,2) DEFAULT '0.00',
  `caloris` decimal(11,2) DEFAULT '0.00',
  `myreward` int(11) DEFAULT NULL,
  `mypoint` int(11) DEFAULT NULL,
  `lastday` varchar(50) DEFAULT '',
  `preMonthSteps` int(11) DEFAULT '0',
  `monthsteps` int(11) DEFAULT '0',
  `resigncount` int(11) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `usertype` int(11) DEFAULT NULL,
  `wxid` varchar(50) DEFAULT '',
  `country` varchar(50) DEFAULT '',
  `province` varchar(50) DEFAULT '',
  `city` varchar(50) DEFAULT '',
  `address` varchar(200) DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `openid` (`openid`),
  KEY `steps` (`steps`),
  KEY `keepcount` (`keepcount`),
  KEY `monthsteps` (`monthsteps`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8;
