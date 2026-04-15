-- CreateTable
CREATE TABLE `acessories` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `index` INTEGER NOT NULL DEFAULT 0,
    `modelid` INTEGER NOT NULL DEFAULT 23455,
    `bone` INTEGER NOT NULL DEFAULT 2,
    `offsetX` FLOAT NULL DEFAULT 0,
    `offsetY` FLOAT NULL DEFAULT 0,
    `offsetZ` FLOAT NULL DEFAULT 0,
    `rotX` FLOAT NULL DEFAULT 0,
    `rotY` FLOAT NULL DEFAULT 0,
    `rotZ` FLOAT NULL DEFAULT 0,
    `fScaleX` FLOAT NOT NULL DEFAULT 1,
    `fScaleY` FLOAT NOT NULL DEFAULT 1,
    `fScaleZ` FLOAT NOT NULL DEFAULT 1,
    `materialcolor1` INTEGER NOT NULL DEFAULT 0,
    `materialcolor2` INTEGER NOT NULL DEFAULT 0,
    `player_id` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_commands_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_accid` INTEGER NOT NULL,
    `admin_name` VARCHAR(24) NOT NULL,
    `admin_ip` VARCHAR(16) NOT NULL,
    `admin_serial` VARCHAR(64) NOT NULL,
    `command` VARCHAR(64) NOT NULL,
    `details` TEXT NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_set_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_id` INTEGER NOT NULL,
    `prevlevel` INTEGER NOT NULL,
    `admin_name` VARCHAR(24) NOT NULL,
    `admin_ip` VARCHAR(16) NOT NULL,
    `admin_serial` VARCHAR(64) NOT NULL,
    `target_id` INTEGER NOT NULL,
    `target_name` VARCHAR(24) NOT NULL,
    `target_ip` VARCHAR(16) NOT NULL,
    `target_serial` VARCHAR(64) NOT NULL,
    `action` ENUM('set', 'unset') NOT NULL,
    `admin_level` INTEGER NOT NULL,
    `executed_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `adminchat_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accid` INTEGER NOT NULL,
    `player_name` VARCHAR(24) NOT NULL,
    `ip` VARCHAR(16) NOT NULL,
    `version` VARCHAR(32) NOT NULL,
    `ping` INTEGER NOT NULL,
    `package_lost` VARCHAR(16) NOT NULL,
    `system` VARCHAR(32) NOT NULL,
    `serial` VARCHAR(64) NOT NULL,
    `country` VARCHAR(32) NOT NULL,
    `message` TEXT NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admintemp` (
    `ADMIN_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `ADMIN_NAME` VARCHAR(24) NOT NULL,
    `ADMIN_ACCID` INTEGER NOT NULL,
    `ADMIN_LEVEL` INTEGER NOT NULL DEFAULT 0,
    `ADMIN_IP` VARCHAR(24) NOT NULL,
    `ADMIN_END` INTEGER NOT NULL DEFAULT 0,
    `ADMIN_WHEN` INTEGER NOT NULL DEFAULT 0,
    `ADMIN_GIVE` VARCHAR(30) NOT NULL DEFAULT 'Key_Actived',

    INDEX `ADMIN_ACCID`(`ADMIN_ACCID`),
    PRIMARY KEY (`ADMIN_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anticheat_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_accid` INTEGER NOT NULL,
    `player_name` VARCHAR(24) NOT NULL,
    `ip` VARCHAR(16) NOT NULL,
    `serial` VARCHAR(64) NOT NULL,
    `detection_type` ENUM('teleport', 'speed_hack', 'weapon_hack', 'air_brake', 'money_cheat', 'vehicle_mod', 'invalid_opcode', 'fly', 'macro', 'sprint_hook', 'aimbot', 'wallhack', 'ac_handling', 'auto_cbug', 'rapid_fire', 'free_kill') NOT NULL,
    `details` TEXT NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ban` (
    `Nick` VARCHAR(24) NOT NULL,
    `data` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `banid` INTEGER NOT NULL AUTO_INCREMENT,
    `accid` INTEGER NOT NULL,
    `ip` VARCHAR(25) NOT NULL,
    `adm` VARCHAR(25) NOT NULL,
    `ban` INTEGER NOT NULL,
    `desban` INTEGER NOT NULL,
    `motivo` VARCHAR(255) NOT NULL,
    `Banip` INTEGER NULL DEFAULT 0,
    `Gpci` VARCHAR(255) NOT NULL,
    `adminid` INTEGER NOT NULL,

    INDEX `accid`(`accid`),
    PRIMARY KEY (`banid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ban_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` ENUM('ban', 'unban') NOT NULL,
    `admin_accid` INTEGER NOT NULL,
    `admin_name` VARCHAR(24) NOT NULL,
    `admin_ip` VARCHAR(16) NOT NULL,
    `admin_serial` VARCHAR(64) NOT NULL,
    `target_accid` INTEGER NOT NULL,
    `target_name` VARCHAR(24) NOT NULL,
    `target_ip` VARCHAR(16) NOT NULL,
    `target_serial` VARCHAR(64) NOT NULL,
    `reason` TEXT NOT NULL,
    `duration_days` INTEGER NOT NULL DEFAULT 0,
    `duration_hours` INTEGER NOT NULL DEFAULT 0,
    `country` VARCHAR(64) NULL,
    `region` VARCHAR(64) NULL,
    `city` VARCHAR(64) NULL,
    `cep` VARCHAR(16) NULL,
    `organization` VARCHAR(128) NULL,
    `isp` VARCHAR(128) NULL,
    `using_vpn` BOOLEAN NULL DEFAULT false,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `text` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bantemp` (
    `banid` INTEGER NOT NULL AUTO_INCREMENT,
    `Nick` VARCHAR(25) NOT NULL,
    `accid` INTEGER NOT NULL,
    `IP` VARCHAR(25) NULL,
    `GPCI` VARCHAR(120) NULL,
    `BanT` INTEGER NOT NULL,
    `desban` INTEGER NOT NULL,
    `Motivo` VARCHAR(128) NOT NULL,
    `Admin` VARCHAR(24) NOT NULL,

    INDEX `accid`(`accid`),
    PRIMARY KEY (`banid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blocked` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `blocked_i` INTEGER NULL,
    `blocker_id` INTEGER NULL,
    `description` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_name` VARCHAR(24) NOT NULL,
    `accid` INTEGER NOT NULL,
    `ip` VARCHAR(16) NOT NULL,
    `version` VARCHAR(32) NOT NULL,
    `ping` INTEGER NOT NULL,
    `package_lost` VARCHAR(16) NOT NULL,
    `system` VARCHAR(32) NOT NULL,
    `serial` VARCHAR(64) NOT NULL,
    `country` VARCHAR(32) NOT NULL,
    `message` TEXT NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `source` VARCHAR(24) NOT NULL DEFAULT 'default_chat',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clan` (
    `CLAN_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `CLAN_NAME` VARCHAR(24) NOT NULL,
    `CLAN_ONWER` VARCHAR(24) NOT NULL DEFAULT 'Ninguem',
    `CLAN_MAX_SLOTS` INTEGER NOT NULL DEFAULT 25,
    `CLAN_LEVEL` INTEGER NOT NULL DEFAULT 1,
    `CLAN_ON` BOOLEAN NOT NULL DEFAULT false,
    `CLAN_STATUS` BOOLEAN NOT NULL DEFAULT false,
    `CLAN_MONEY` INTEGER NOT NULL DEFAULT 300000,
    `CLAN_ZONES` INTEGER NOT NULL DEFAULT 0,
    `CLAN_WHEN` INTEGER NOT NULL DEFAULT 0,
    `CLAN_COLOR` VARCHAR(26) NOT NULL DEFAULT 'FF0000',
    `CLAN_TAG` VARCHAR(25) NOT NULL DEFAULT 'Nenhuma',
    `CLAN_M_T` INTEGER NOT NULL DEFAULT 1,
    `PCX` DOUBLE NOT NULL DEFAULT 2034.26123,
    `PCY` DOUBLE NOT NULL DEFAULT 1009.479248,
    `PCZ` DOUBLE NOT NULL DEFAULT 10.820312,
    `PCA` DOUBLE NOT NULL DEFAULT 93.481964,
    `CLAN_MEMBROS` INTEGER NOT NULL DEFAULT 0,
    `CLAN_MOD` VARCHAR(255) NOT NULL DEFAULT 'Acabem Com Todos',

    PRIMARY KEY (`CLAN_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cnr` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `wanted` INTEGER NOT NULL DEFAULT 0,
    `score` INTEGER NOT NULL DEFAULT 0,
    `player_accid` INTEGER NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `Ip` VARCHAR(26) NOT NULL,
    `system` VARCHAR(255) NOT NULL,
    `cash` INTEGER NOT NULL DEFAULT 0,
    `skin` INTEGER NOT NULL DEFAULT 7,
    `kills` INTEGER NOT NULL DEFAULT 0,
    `death` INTEGER NOT NULL DEFAULT 0,
    `classname` VARCHAR(24) NULL DEFAULT 'Nenhum',

    INDEX `player_accid`(`player_accid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `config` (
    `C_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `C_S_ADMIN` INTEGER NOT NULL DEFAULT 217,
    `C_TAG_ADMIN` BOOLEAN NOT NULL DEFAULT false,
    `C_CMSG` BOOLEAN NOT NULL DEFAULT true,
    `C_DMSG` BOOLEAN NOT NULL DEFAULT true,
    `C_RANMSG` BOOLEAN NOT NULL DEFAULT false,
    `C_READMSG` BOOLEAN NOT NULL DEFAULT false,
    `C_CHNICK` BOOLEAN NOT NULL DEFAULT true,
    `C_SPAWN_LOCAL` BOOLEAN NOT NULL DEFAULT false,
    `C_AUTOLOGIN` BOOLEAN NOT NULL DEFAULT false,
    `C_ANTBOT` BOOLEAN NOT NULL DEFAULT true,
    `C_SCMDADMIN` BOOLEAN NOT NULL DEFAULT true,
    `C_READPMS` BOOLEAN NOT NULL DEFAULT true,
    `C_MAX_PING` INTEGER NOT NULL DEFAULT 950,
    `C_MIN_PING` INTEGER NOT NULL DEFAULT 85,
    `C_A_MOBILES` BOOLEAN NOT NULL DEFAULT true,
    `C_MAX_MONEY` INTEGER NOT NULL DEFAULT 999999999,
    `C_CHECKPING` BOOLEAN NOT NULL DEFAULT false,
    `C_CHECKBWORD` BOOLEAN NOT NULL DEFAULT true,
    `C_CHECKMONEY` BOOLEAN NOT NULL DEFAULT true,
    `C_ANTSPAWNK` BOOLEAN NOT NULL DEFAULT true,
    `C_SCOREB` BOOLEAN NOT NULL DEFAULT true,
    `C_LOWERCASE` BOOLEAN NOT NULL DEFAULT false,
    `C_UPPERCASE` BOOLEAN NOT NULL DEFAULT false,
    `C_CHATNORMAL` BOOLEAN NOT NULL DEFAULT true,
    `C_ALLOWMUSIC` BOOLEAN NOT NULL DEFAULT true,
    `C_REQEMAIL` BOOLEAN NOT NULL DEFAULT true,
    `C_MUSICSTREAM` VARCHAR(255) NOT NULL DEFAULT 'https://live.hunter.fm/sertanejo_high',
    `C_FORUM` VARCHAR(255) NOT NULL DEFAULT 'https://brasilmatamata.forumotion.com/',
    `C_DISCORD` VARCHAR(255) NOT NULL DEFAULT 'https://discord.gg/eyyjyT6sub',
    `C_PROHIBIT` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`C_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `connect_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_name` VARCHAR(24) NOT NULL,
    `accid` INTEGER NOT NULL,
    `action` ENUM('CONNECT', 'DISCONNECT') NOT NULL,
    `ip` VARCHAR(16) NOT NULL,
    `version` VARCHAR(50) NOT NULL DEFAULT '0.3.7',
    `System` VARCHAR(50) NOT NULL DEFAULT 'Apks',
    `ping` INTEGER NOT NULL DEFAULT 0,
    `Package_Lost` VARCHAR(50) NULL DEFAULT '0',
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `serial` VARCHAR(522) NOT NULL DEFAULT 'Desconhecido - bot',
    `country` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `emails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL DEFAULT 'not set',
    `data` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `playername` VARCHAR(25) NOT NULL DEFAULT 'not set',
    `player_accid` INTEGER NULL,
    `verified` TINYINT NOT NULL DEFAULT 0,
    `email_code` VARCHAR(20) NOT NULL DEFAULT 'not set',
    `email_source` VARCHAR(30) NOT NULL DEFAULT 'No Servidor',

    INDEX `player_accid`(`player_accid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `houses` (
    `HOUSE_iD` INTEGER NOT NULL AUTO_INCREMENT,
    `HOUSE_NAME` VARCHAR(255) NOT NULL,
    `HOUSE_PRICE` INTEGER NOT NULL DEFAULT 15000,
    `HOUSE_ONWER` VARCHAR(24) NOT NULL,
    `HOUSE_ID_TEXT` INTEGER NOT NULL DEFAULT 0,
    `HOUSE_TEXT3D` VARCHAR(34) NOT NULL,
    `HOUSE_X` DOUBLE NOT NULL DEFAULT 0,
    `HOUSE_Y` DOUBLE NOT NULL DEFAULT 0,
    `HOUSE_Z` DOUBLE NOT NULL DEFAULT 0,
    `HOUSE_BUY` BOOLEAN NOT NULL DEFAULT false,
    `HOUSE_LEVEL` INTEGER NOT NULL DEFAULT 1,
    `HOUSE_X_I` DOUBLE NOT NULL DEFAULT 2496.049804,
    `HOUSE_Y_I` DOUBLE NOT NULL DEFAULT -1695.238159,
    `HOUSE_Z_I` DOUBLE NOT NULL DEFAULT 1014.742187,
    `HOUSE_ID_I` INTEGER NOT NULL DEFAULT 3,
    `HOUSE_VW` INTEGER NOT NULL DEFAULT 20,
    `HOUSE_ACID_ONWER` INTEGER NOT NULL DEFAULT 0,
    `HOUSE_VENDA` BOOLEAN NOT NULL DEFAULT true,
    `HOUSE_RATE` INTEGER NOT NULL DEFAULT 150,

    PRIMARY KEY (`HOUSE_iD`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ip_ban_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` ENUM('ban', 'unban') NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `admin_name` VARCHAR(24) NOT NULL,
    `banned_ip` VARCHAR(16) NOT NULL,
    `reason` TEXT NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ipban` (
    `idp` INTEGER NOT NULL AUTO_INCREMENT,
    `IP` VARCHAR(30) NOT NULL,
    `Reason` VARCHAR(24) NOT NULL,
    `Admind` VARCHAR(24) NOT NULL,
    `date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ban` INTEGER NULL DEFAULT 0,
    `desban` INTEGER NULL DEFAULT 0,
    `system` VARCHAR(50) NOT NULL DEFAULT 'not recognized',
    `playername` VARCHAR(50) NOT NULL DEFAULT 'By /banirip',

    PRIMARY KEY (`idp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `keys` (
    `KEY_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `KEY_NAME` VARCHAR(255) NOT NULL DEFAULT 'NotKey',
    `KEY_VIP` INTEGER NOT NULL DEFAULT 0,
    `KEY_ADMIN` INTEGER NOT NULL DEFAULT 0,
    `TIME_SET` INTEGER NOT NULL DEFAULT 0,
    `KEY_WHEN` VARCHAR(25) NOT NULL DEFAULT 'Nobody',

    PRIMARY KEY (`KEY_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kits` (
    `kit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `kit_name` VARCHAR(24) NOT NULL DEFAULT 'Sem Nome',
    `descricao` VARCHAR(69) NULL DEFAULT 'Kit para walk',
    `player_id` INTEGER NOT NULL,
    `data` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`kit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `map` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(222) NOT NULL DEFAULT 'Mapa-sem-nome',
    `dono` VARCHAR(25) NOT NULL DEFAULT 'server',
    `accid` INTEGER NOT NULL,
    `data` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `x` DOUBLE NULL DEFAULT 0,
    `y` DOUBLE NULL DEFAULT 0,
    `z` DOUBLE NULL DEFAULT 0,
    `descricao` VARCHAR(222) NULL DEFAULT 'Sem descricao',
    `status` INTEGER NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members` (
    `M_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `M_NAME` VARCHAR(39) NOT NULL,
    `M_LEVEL` INTEGER NOT NULL DEFAULT 0,
    `M_ACCID` INTEGER NOT NULL,
    `M_CLAN` VARCHAR(25) NOT NULL DEFAULT 'Nenhum',
    `M_CLAN_ONWER` BOOLEAN NOT NULL DEFAULT false,
    `M_CLANID` INTEGER NOT NULL,
    `M_TITLE` VARCHAR(25) NOT NULL DEFAULT 'Membro',

    INDEX `M_ACCID`(`M_ACCID`),
    PRIMARY KEY (`M_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mutados` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(24) NOT NULL,
    `accid` INTEGER NOT NULL,
    `IP` VARCHAR(25) NOT NULL,
    `GPCI` VARCHAR(120) NOT NULL,
    `Motivo` VARCHAR(255) NOT NULL,
    `Data` VARCHAR(75) NOT NULL,
    `Admin` VARCHAR(24) NOT NULL,
    `Tempo` INTEGER NOT NULL DEFAULT 0,
    `System` VARCHAR(24) NOT NULL DEFAULT 'Not in game',
    `Adminid` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nick_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nick` VARCHAR(40) NULL,
    `jogador_id` INTEGER NULL,
    `nick_antigo` VARCHAR(255) NULL,
    `data` VARCHAR(75) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `objects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modelid` INTEGER NOT NULL DEFAULT 7899,
    `x` FLOAT NULL DEFAULT 0,
    `y` FLOAT NULL DEFAULT 0,
    `z` FLOAT NULL DEFAULT 0,
    `rx` FLOAT NULL DEFAULT 0,
    `ry` FLOAT NULL DEFAULT 0,
    `rz` FLOAT NULL DEFAULT 0,
    `distance` FLOAT NULL DEFAULT 0,
    `player_id` INTEGER NOT NULL,
    `map_id` INTEGER NOT NULL,
    `virtualw` INTEGER NOT NULL,
    `inter` INTEGER NOT NULL,
    `status` INTEGER NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(24) NOT NULL,
    `Email` VARCHAR(50) NOT NULL DEFAULT 'Nao Definido',
    `Ip` VARCHAR(20) NOT NULL,
    `Admin` INTEGER NULL DEFAULT 0,
    `Score` INTEGER NULL DEFAULT 230,
    `Skin` INTEGER NULL DEFAULT 296,
    `Matou` INTEGER NULL DEFAULT 2,
    `Morreu` INTEGER NULL DEFAULT 3,
    `Vida` DOUBLE NULL DEFAULT 100,
    `Colete` DOUBLE NULL DEFAULT 100,
    `Registred` INTEGER NOT NULL DEFAULT 0,
    `Gpci` VARCHAR(255) NOT NULL DEFAULT '1',
    `Dinheiro` BIGINT NOT NULL DEFAULT 3000,
    `HeadShots` INTEGER NOT NULL DEFAULT 1,
    `pPosX` DOUBLE NULL DEFAULT -2240.9197,
    `pPosY` DOUBLE NULL DEFAULT 252.0263,
    `pPosZ` DOUBLE NULL DEFAULT 35.3203,
    `pPosA` DOUBLE NULL DEFAULT 91.2125,
    `SPAWN_L` INTEGER NOT NULL DEFAULT 0,
    `Salt` VARCHAR(255) NOT NULL DEFAULT '0',
    `Spree` INTEGER NOT NULL DEFAULT 0,
    `LasTimer` INTEGER NULL DEFAULT 0,
    `Online` BOOLEAN NULL DEFAULT false,
    `Clan` VARCHAR(24) NOT NULL DEFAULT 'Nenhum',
    `PLAYER_CLAN` BOOLEAN NOT NULL DEFAULT false,
    `IS_VIP` INTEGER NOT NULL DEFAULT 0,
    `BUGED1` INTEGER NOT NULL DEFAULT 0,
    `BUGED2` INTEGER NOT NULL DEFAULT 0,
    `BUGED3` INTEGER NOT NULL DEFAULT 0,
    `Procurado` INTEGER NOT NULL DEFAULT 0,
    `BANNED` INTEGER NOT NULL DEFAULT 0,
    `H_PROP` INTEGER NOT NULL DEFAULT 0,
    `T_PROP` INTEGER NOT NULL DEFAULT 0,
    `SPAWN_LAST` INTEGER NOT NULL DEFAULT 0,
    `Warnings` INTEGER NOT NULL DEFAULT 0,
    `MUTED` BOOLEAN NOT NULL DEFAULT false,
    `KitRun` BOOLEAN NOT NULL DEFAULT false,
    `KitWalk` BOOLEAN NOT NULL DEFAULT true,
    `Version` VARCHAR(24) NOT NULL DEFAULT '3.0.1',
    `Device` VARCHAR(24) NOT NULL DEFAULT 'Nao Verificado',
    `Tag` VARCHAR(255) NOT NULL DEFAULT 'Grauzinho',
    `Tag_Color` VARCHAR(255) NOT NULL DEFAULT '00FF00',
    `Tag_Color_hexa` VARCHAR(255) NOT NULL DEFAULT '0x00FF00',
    `Tag_Inuse` BOOLEAN NOT NULL DEFAULT true,
    `YouTuber` BOOLEAN NOT NULL DEFAULT false,
    `PLYAERHASTAG` BOOLEAN NOT NULL DEFAULT true,
    `TimerOnServer` INTEGER NOT NULL DEFAULT 1,
    `MODO_MATA` BOOLEAN NOT NULL DEFAULT true,
    `Email_confirmed` BOOLEAN NOT NULL DEFAULT false,
    `spawn_colete` BOOLEAN NOT NULL DEFAULT false,
    `discord_id` VARCHAR(255) NOT NULL DEFAULT 'nenhum',
    `discord_codsync` VARCHAR(255) NOT NULL DEFAULT 'nenhum',
    `original_nickname` VARCHAR(255) NOT NULL DEFAULT 'Sem set',
    `pais` VARCHAR(255) NOT NULL DEFAULT 'Nao Definido',
    `cidade` VARCHAR(255) NOT NULL DEFAULT 'Nao Definido',
    `regiao` VARCHAR(255) NOT NULL DEFAULT 'Nao Definido',
    `cep` VARCHAR(255) NOT NULL DEFAULT 'Nao Definido',
    `organizacao` VARCHAR(255) NOT NULL DEFAULT 'Nao Definido',
    `fuso_horario` VARCHAR(255) NOT NULL DEFAULT 'Nao Definido',
    `isp` VARCHAR(255) NOT NULL DEFAULT 'Nao Definido',
    `vpn` VARCHAR(255) NOT NULL DEFAULT 'Privado',
    `coordenadas` VARCHAR(255) NOT NULL DEFAULT 'Nao definido',
    `StoragedNick` BOOLEAN NOT NULL DEFAULT false,
    `grupo` VARCHAR(100) NOT NULL DEFAULT 'semgrupo',
    `has_group` BOOLEAN NOT NULL DEFAULT false,
    `admhide` BOOLEAN NOT NULL DEFAULT false,
    `NickChange` INTEGER NOT NULL DEFAULT 0,
    `horas_jogadas` INTEGER NOT NULL DEFAULT 0,
    `Hud_stats_1` BOOLEAN NOT NULL DEFAULT true,
    `Hud_stats_2` BOOLEAN NOT NULL DEFAULT false,
    `Preso` BOOLEAN NOT NULL DEFAULT false,
    `ADMIN_TEMP` INTEGER NOT NULL DEFAULT 0,
    `acessories` INTEGER NOT NULL DEFAULT 0,
    `has_accesories` BOOLEAN NOT NULL DEFAULT false,
    `Arena_kills` INTEGER NOT NULL DEFAULT 0,
    `Arena_deaths` INTEGER NOT NULL DEFAULT 0,
    `Arena_scores` INTEGER NOT NULL DEFAULT 0,
    `Hud_players` BOOLEAN NOT NULL DEFAULT true,
    `blockban` BOOLEAN NOT NULL DEFAULT false,
    `Mapper` BOOLEAN NOT NULL DEFAULT false,
    `isVpn` BOOLEAN NOT NULL DEFAULT false,
    `banreason` VARCHAR(255) NULL DEFAULT 'Jogador nao banido',
    `Color` VARCHAR(10) NULL DEFAULT 'FFFFFF',
    `HasEmail` BOOLEAN NOT NULL DEFAULT false,
    `EmailVerified` BOOLEAN NOT NULL DEFAULT false,
    `EmailChangeTime` INTEGER NOT NULL DEFAULT 0,
    `Senha` VARCHAR(255) NOT NULL,
    `user_register` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `profile` VARCHAR(100) NOT NULL DEFAULT 'https://res.cloudinary.com/dcun12csz/image/upload/v1774628141/profile_cfxxfi.webp',
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `role` ENUM('USER', 'ADMIN', 'MODERATOR', 'SUPERVISOR', 'OWNER', 'DEV') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `unique_name`(`Nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pm_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sender_accid` INTEGER NOT NULL,
    `sender_name` VARCHAR(24) NOT NULL,
    `sender_ip` VARCHAR(16) NOT NULL,
    `sender_serial` VARCHAR(64) NOT NULL,
    `receiver_accid` INTEGER NOT NULL,
    `receiver_name` VARCHAR(24) NOT NULL,
    `receiver_ip` VARCHAR(16) NOT NULL,
    `receiver_serial` VARCHAR(64) NOT NULL,
    `message` TEXT NOT NULL,
    `command` ENUM('pm', 'r') NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `presos` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(24) NOT NULL,
    `accid` INTEGER NOT NULL,
    `IP` VARCHAR(25) NOT NULL,
    `GPCI` VARCHAR(120) NOT NULL,
    `Motivo` VARCHAR(255) NOT NULL,
    `Data` VARCHAR(75) NOT NULL,
    `Admin` VARCHAR(24) NOT NULL,
    `Tempo` INTEGER NOT NULL DEFAULT 0,
    `System` VARCHAR(24) NOT NULL DEFAULT 'Not in game',
    `Adminid` INTEGER NOT NULL DEFAULT 0,
    `TimeLeft` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `report_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accid` INTEGER NOT NULL,
    `player_name` VARCHAR(24) NOT NULL,
    `reported_player` VARCHAR(24) NOT NULL,
    `ip` VARCHAR(16) NOT NULL,
    `version` VARCHAR(32) NOT NULL,
    `ping` INTEGER NOT NULL,
    `package_lost` VARCHAR(16) NOT NULL,
    `system` VARCHAR(32) NOT NULL,
    `serial` VARCHAR(64) NOT NULL,
    `country` VARCHAR(32) NOT NULL,
    `message` TEXT NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vip_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_id` INTEGER NOT NULL,
    `admin_name` VARCHAR(24) NOT NULL,
    `admin_ip` VARCHAR(16) NOT NULL,
    `admin_serial` VARCHAR(64) NOT NULL,
    `player_id` INTEGER NOT NULL,
    `player_name` VARCHAR(24) NOT NULL,
    `player_ip` VARCHAR(16) NOT NULL,
    `player_serial` VARCHAR(64) NOT NULL,
    `vip_days` INTEGER NOT NULL,
    `vip_timestamp_end` INTEGER NOT NULL,
    `action_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vips` (
    `VIP_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `VIP_NAME` VARCHAR(24) NOT NULL,
    `date` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `VIP_IP` VARCHAR(24) NOT NULL,
    `VIP_LEVEL` INTEGER NOT NULL DEFAULT 0,
    `VIP_WHEN` INTEGER NOT NULL,
    `VIP_END` INTEGER NOT NULL,
    `ACCID_PLAYER` INTEGER NOT NULL,
    `VIP_PLAYER` BOOLEAN NOT NULL DEFAULT false,
    `VIP_GADMIN` VARCHAR(26) NOT NULL DEFAULT 'Key_Acved',
    `VIP_COLOR` VARCHAR(23) NOT NULL DEFAULT '00FFFF',
    `VIP_CHAT_COLOR` VARCHAR(23) NOT NULL DEFAULT '00FF00',

    INDEX `ACCID_PLAYER`(`ACCID_PLAYER`),
    PRIMARY KEY (`VIP_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `warning_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_accid` INTEGER NOT NULL,
    `admin_name` VARCHAR(24) NOT NULL,
    `admin_ip` VARCHAR(16) NOT NULL,
    `admin_serial` VARCHAR(64) NOT NULL,
    `target_accid` INTEGER NOT NULL,
    `target_name` VARCHAR(24) NOT NULL,
    `target_ip` VARCHAR(16) NOT NULL,
    `target_serial` VARCHAR(64) NOT NULL,
    `reason` TEXT NOT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weapons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `weapon_id` INTEGER NOT NULL,
    `weapon_ammu` INTEGER NOT NULL DEFAULT 7876,
    `data` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `weapon_id`(`weapon_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket_messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticketid` INTEGER NOT NULL,
    `author_accid` INTEGER NOT NULL,
    `message` TEXT NOT NULL,
    `role` ENUM('USER', 'ADMIN', 'MODERATOR', 'SUPERVISOR') NOT NULL DEFAULT 'USER',
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `author_accid`(`author_accid`),
    INDEX `ticketid`(`ticketid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tickets` (
    `ticketid` INTEGER NOT NULL AUTO_INCREMENT,
    `ticket_type` ENUM('admin_report', 'ban_appeal', 'report') NOT NULL,
    `author` VARCHAR(100) NOT NULL,
    `author_accid` INTEGER NOT NULL,
    `against_accid` INTEGER NULL,
    `name` VARCHAR(100) NULL,
    `status` ENUM('open', 'closed', 'denied') NULL DEFAULT 'open',
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `against_accid`(`against_accid`),
    INDEX `author_accid`(`author_accid`),
    PRIMARY KEY (`ticketid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admintemp` ADD CONSTRAINT `AdminTemp_ibfk_1` FOREIGN KEY (`ADMIN_ACCID`) REFERENCES `player`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ban` ADD CONSTRAINT `Ban_ibfk_1` FOREIGN KEY (`accid`) REFERENCES `player`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `bantemp` ADD CONSTRAINT `BanTemp_ibfk_1` FOREIGN KEY (`accid`) REFERENCES `player`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cnr` ADD CONSTRAINT `cnr_ibfk_1` FOREIGN KEY (`player_accid`) REFERENCES `player`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `emails` ADD CONSTRAINT `emails_ibfk_1` FOREIGN KEY (`player_accid`) REFERENCES `player`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `Members_ibfk_1` FOREIGN KEY (`M_ACCID`) REFERENCES `player`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `vips` ADD CONSTRAINT `Vips_ibfk_1` FOREIGN KEY (`ACCID_PLAYER`) REFERENCES `player`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `weapons` ADD CONSTRAINT `weapons_ibfk_1` FOREIGN KEY (`weapon_id`) REFERENCES `kits`(`kit_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ticket_messages` ADD CONSTRAINT `ticket_messages_ibfk_1` FOREIGN KEY (`ticketid`) REFERENCES `tickets`(`ticketid`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ticket_messages` ADD CONSTRAINT `ticket_messages_ibfk_2` FOREIGN KEY (`author_accid`) REFERENCES `player`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`author_accid`) REFERENCES `player`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`against_accid`) REFERENCES `player`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
