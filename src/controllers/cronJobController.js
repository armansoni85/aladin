import fs from "fs";
import connection from "../config/connectDB.js";
import winGoController from "./winGoController.js";
import k5Controller from "./k5Controller.js";
import k3Controller from "./k3Controller.js";
import trxWingoController, {
  TRX_WINGO_GAME_TYPE_MAP,
} from "./trxWingoController.js";
import cron from "node-cron";
import vipController from "./vipController.js";
import gameController from "./gameController.js";

const LOCK_FILE = "/tmp/cron.lock";

function isCronLocked() {
  return fs.existsSync(LOCK_FILE);
}

function lockCron() {
  fs.writeFileSync(LOCK_FILE, Date.now().toString());
  console.log("[CRON] Lock acquired");
}

function unlockCron() {
  if (fs.existsSync(LOCK_FILE)) {
    fs.unlinkSync(LOCK_FILE);
    console.log("[CRON] Lock released");
  }
}

// Ensure lock is cleaned up on exit
process.on("exit", unlockCron);
process.on("SIGINT", unlockCron);
process.on("SIGTERM", unlockCron);

const cronJobGame1p = (io) => {

  
  if (isCronLocked()) {
    console.log("[CRON] Skipping: Another instance already running.");
    return;
  }

  lockCron();

  cron.schedule("*/1 * * * *", async () => {
    await trxWingoController.addTrxWingo(1);
    await trxWingoController.handlingTrxWingo1P(1);
    const [trxWingo] = await connection.execute(
      `SELECT * FROM trx_wingo_game WHERE game = '${TRX_WINGO_GAME_TYPE_MAP.MIN_1}' ORDER BY id DESC LIMIT 2`,
      [],
    );
    io.emit("data-server-trx-wingo", { data: trxWingo });

    await winGoController.addWinGo(1);
    await winGoController.handlingWinGo1P(1);
    const [winGo1] = await connection.execute(
      'SELECT * FROM `wingo` WHERE `game` = "wingo" ORDER BY `id` DESC LIMIT 2 ',
      [],
    );
    io.emit("data-server", { data: winGo1 });

    await k5Controller.add5D(1);
    await k5Controller.handling5D(1);
    const [k5D] = await connection.execute(
      "SELECT * FROM 5d WHERE `game` = 1 ORDER BY `id` DESC LIMIT 2 ",
      [],
    );
    io.emit("data-server-5d", { data: k5D, game: "1" });

    await k3Controller.addK3(1);
    await k3Controller.handlingK3(1);
    const [k3] = await connection.execute(
      "SELECT * FROM k3 WHERE `game` = 1 ORDER BY `id` DESC LIMIT 2 ",
      [],
    );
    io.emit("data-server-k3", { data: k3, game: "1" });
  });

  cron.schedule("*/3 * * * *", async () => {
    await trxWingoController.addTrxWingo(3);
    await trxWingoController.handlingTrxWingo1P(3);
    const [trxWingo] = await connection.execute(
      `SELECT * FROM trx_wingo_game WHERE game = '${TRX_WINGO_GAME_TYPE_MAP.MIN_3}' ORDER BY id DESC LIMIT 2`,
      [],
    );
    io.emit("data-server-trx-wingo", { data: trxWingo });

    await winGoController.addWinGo(3);
    await winGoController.handlingWinGo1P(3);
    const [winGo1] = await connection.execute(
      'SELECT * FROM `wingo` WHERE `game` = "wingo3" ORDER BY `id` DESC LIMIT 2 ',
      [],
    );
    io.emit("data-server", { data: winGo1 });

    await k5Controller.add5D(3);
    await k5Controller.handling5D(3);
    const [k5D] = await connection.execute(
      "SELECT * FROM 5d WHERE `game` = 3 ORDER BY `id` DESC LIMIT 2 ",
      [],
    );
    io.emit("data-server-5d", { data: k5D, game: "3" });

    await k3Controller.addK3(3);
    await k3Controller.handlingK3(3);
    const [k3] = await connection.execute(
      "SELECT * FROM k3 WHERE `game` = 3 ORDER BY `id` DESC LIMIT 2 ",
      [],
    );
    io.emit("data-server-k3", { data: k3, game: "3" });
  });

  cron.schedule("*/5 * * * *", async () => {
    await trxWingoController.addTrxWingo(5);
    await trxWingoController.handlingTrxWingo1P(5);
    const [trxWingo] = await connection.execute(
      `SELECT * FROM trx_wingo_game WHERE game = '${TRX_WINGO_GAME_TYPE_MAP.MIN_5}' ORDER BY id DESC LIMIT 2`,
      [],
    );
    io.emit("data-server-trx-wingo", { data: trxWingo });

    await winGoController.addWinGo(5);
    await winGoController.handlingWinGo1P(5);
    const [winGo1] = await connection.execute(
      'SELECT * FROM `wingo` WHERE `game` = "wingo5" ORDER BY `id` DESC LIMIT 2 ',
      [],
    );
    io.emit("data-server", { data: winGo1 });

    await k5Controller.add5D(5);
    await k5Controller.handling5D(5);
    const [k5D] = await connection.execute(
      "SELECT * FROM 5d WHERE `game` = 5 ORDER BY `id` DESC LIMIT 2 ",
      [],
    );
    io.emit("data-server-5d", { data: k5D, game: "5" });

    await k3Controller.addK3(5);
    await k3Controller.handlingK3(5);
    const [k3] = await connection.execute(
      "SELECT * FROM k3 WHERE `game` = 5 ORDER BY `id` DESC LIMIT 2 ",
      [],
    );
    io.emit("data-server-k3", { data: k3, game: "5" });
  });

  cron.schedule("*/10 * * * *", async () => {
    await trxWingoController.addTrxWingo(10);
    await trxWingoController.handlingTrxWingo1P(10);
    const [trxWingo] = await connection.execute(
      `SELECT * FROM trx_wingo_game WHERE game = '${TRX_WINGO_GAME_TYPE_MAP.MIN_10}' ORDER BY id DESC LIMIT 2`,
      [],
    );
    io.emit("data-server-trx-wingo", { data: trxWingo });

    await winGoController.addWinGo(10);
    await winGoController.handlingWinGo1P(10);
    const [winGo1] = await connection.execute(
      'SELECT * FROM `wingo` WHERE `game` = "wingo10" ORDER BY `id` DESC LIMIT 2 ',
      [],
    );
    io.emit("data-server", { data: winGo1 });

    await k5Controller.add5D(10);
    await k5Controller.handling5D(10);
    const [k5D] = await connection.execute(
      "SELECT * FROM 5d WHERE `game` = 10 ORDER BY `id` DESC LIMIT 2 ",
      [],
    );
    io.emit("data-server-5d", { data: k5D, game: "10" });

    await k3Controller.addK3(10);
    await k3Controller.handlingK3(10);
    const [k3] = await connection.execute(
      "SELECT * FROM k3 WHERE `game` = 10 ORDER BY `id` DESC LIMIT 2 ",
      [],
    );
    io.emit("data-server-k3", { data: k3, game: "10" });
  });

  cron.schedule("0 1 * * *", async () => {
    await connection.execute("UPDATE users SET roses_today = ?", [0]);
    await connection.execute("UPDATE point_list SET money = ?", [0]);
    await connection.execute("UPDATE turn_over SET daily_turn_over = ?", [0]);
  });

  cron.schedule("0 3 * * *", async () => {
    gameController.autoCleanOldGames();
  });

  cron.schedule("0 2 1 * *", async () => {
    vipController.releaseVIPLevel();
  });

  cron.schedule("0 0 * * *", async () => {
    await winGoController.distributeCommission();
  });
};

const cronJobController = {
  cronJobGame1p,
};

export default cronJobController;
