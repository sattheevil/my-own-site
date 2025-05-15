// Cookie Clicker with Prestige Reset and Increased Upgrade Costs

let cookies = 0;
let cookiesPerClick = 1;
let autoClickers = 0;
let clickMultiplier = 1;
let multiplierLevel = 1;
let manualClicks = 0;

let clickUpgradeCost = 50;
let autoUpgradeCost = 100;
let multiplierUpgradeCost = 500;
let megaClickerCost = 1000;
let autoFactoryCost = 1500;
let quantumClickerCost = 5000;
let cookieDroneCost = 8000;
let dimensionalMultCost = 12000;

let goldenCookieCost = 2000;
let goldenCookieUnlocked = false;
let goldenCookieActive = false;
let goldenCookieUsedAt = -60000;
let goldenCookieDuration = 20000;
let goldenCookieCooldown = 60000;

let lastAutoClickTime = 0;
let latestAchievement = "";

let prestigePoints = 0;
let prestigePerClickBonus = 0;
let prestigeMultiplierBonus = 0;
let prestigeAutoBonus = 0;
let prestigeClickSpeedBonus = 0;
let prestigeGoldenCookieDuration = 0;
let prestigeGoldenCookieCooldown = 0;

let showPrestigeScreen = false;

let cookieScale = 1;
let cookieScaleVel = 0;

let prestigeCount = 0;

function setup() {
  createCanvas(500, 750);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255);

  if (showPrestigeScreen) {
    drawPrestigeScreen();
    return;
  }

  if (millis() - lastAutoClickTime > 1000 - prestigeClickSpeedBonus) {
    let bonus = goldenCookieActive ? 3 : 1;
    cookies += (autoClickers + prestigeAutoBonus) * bonus;
    lastAutoClickTime = millis();
  }

  if (goldenCookieActive && millis() - goldenCookieUsedAt >= goldenCookieDuration + prestigeGoldenCookieDuration) {
    goldenCookieActive = false;
  }

  cookieScale += cookieScaleVel;
  cookieScaleVel *= 0.8;
  cookieScale = constrain(cookieScale, 0.9, 1.1);
  if (abs(cookieScale - 1) < 0.01) {
    cookieScale = 1;
    cookieScaleVel = 0;
  }

  push();
  translate(width / 2, height / 2 - 100);
  scale(cookieScale);
  fill(200, 150, 100);
  ellipse(0, 0, 150, 150);
  pop();

  if (goldenCookieUnlocked) {
    let ready = millis() - goldenCookieUsedAt >= goldenCookieCooldown + prestigeGoldenCookieCooldown;
    fill(goldenCookieActive ? color(255, 200, 0) : ready ? color(255, 255, 100) : 150);
    stroke(255, 215, 0);
    ellipse(width / 2 + 120, height / 2 - 180, 50);
    noStroke();
    fill(0);
    textSize(10);
    text("G", width / 2 + 120, height / 2 - 180);
  }

  fill(0);
  textSize(20);
  text("Cookies: " + nf(cookies, 1, 0), width / 2, 30);
  text("Clicked Cookies: " + manualClicks, width / 2, 60);
  text("Prestige Count: " + prestigeCount, width / 2, 90);

  if (goldenCookieActive) {
    fill(255, 100, 0);
    text("Golden Cookie Active! 3x", width / 2, 120);
  }

  textSize(14);
  let y = 380;
  drawButton("Upgrade Click (+1) - " + clickUpgradeCost, y);
  drawButton("Auto-Clicker (+1/sec) - " + autoUpgradeCost, y + 30);
  drawButton("Click Multiplier x" + clickMultiplier + " - " + multiplierUpgradeCost, y + 60);
  drawButton("Mega Clicker (+5/click) - " + megaClickerCost, y + 90);
  drawButton("Auto Factory (+5/sec) - " + autoFactoryCost, y + 120);
  if (!goldenCookieUnlocked) {
    drawButton("Unlock Golden Cookie - " + goldenCookieCost, y + 150);
  }
  drawButton("Quantum Clicker (+20/click) - " + quantumClickerCost, y + 180);
  drawButton("Cookie Drone (+20/sec) - " + cookieDroneCost, y + 210);
  drawButton("Dimensional Mult x2 - " + dimensionalMultCost, y + 240);

  if (cookies >= 1e8) {
    let prestigeGain = floor(cookies / 1e8);
    drawButton("Enter Prestige Screen (+" + prestigeGain + " PP)", y + 280);
  }

  text("Prestige Points: " + prestigePoints, width / 2, y + 310);

  if (latestAchievement !== "") {
    text("🏆 Achievement: " + latestAchievement, width / 2, y - 220);
  }
}

function mousePressed() {
  let d = dist(mouseX, mouseY, width / 2, height / 2 - 100);
  if (d < 75) {
    let bonus = goldenCookieActive ? 3 : 1;
    let totalClick = (cookiesPerClick + prestigePerClickBonus) * clickMultiplier + prestigeMultiplierBonus;
    cookies += totalClick * bonus;
    manualClicks++;
    cookieScaleVel = 0.1;

    if (manualClicks == 10) latestAchievement = "First Clicks!";
    if (manualClicks == 100) latestAchievement = "Clicking Frenzy!";
    if (manualClicks == 1000) latestAchievement = "Insane Clicker!";
  }

  let ready = millis() - goldenCookieUsedAt >= goldenCookieCooldown + prestigeGoldenCookieCooldown;
  let gx = width / 2 + 120;
  let gy = height / 2 - 180;
  if (goldenCookieUnlocked && dist(mouseX, mouseY, gx, gy) < 25 && ready) {
    goldenCookieActive = true;
    goldenCookieUsedAt = millis();
  }

  if (showPrestigeScreen) {
    handlePrestigeClick();
    return;
  }

  let y = 380;
  if (mouseInButton(y) && cookies >= clickUpgradeCost) {
    cookies -= clickUpgradeCost;
    cookiesPerClick++;
    clickUpgradeCost = floor(clickUpgradeCost * 1.3);
  } else if (mouseInButton(y + 30) && cookies >= autoUpgradeCost) {
    cookies -= autoUpgradeCost;
    autoClickers++;
    autoUpgradeCost = floor(autoUpgradeCost * 1.6);
  } else if (mouseInButton(y + 60) && cookies >= multiplierUpgradeCost) {
    cookies -= multiplierUpgradeCost;
    clickMultiplier *= 2;
    multiplierLevel++;
    multiplierUpgradeCost = floor(multiplierUpgradeCost * 3);
  } else if (mouseInButton(y + 90) && cookies >= megaClickerCost) {
    cookies -= megaClickerCost;
    cookiesPerClick += 5;
    megaClickerCost *= 2;
  } else if (mouseInButton(y + 120) && cookies >= autoFactoryCost) {
    cookies -= autoFactoryCost;
    autoClickers += 5;
    autoFactoryCost *= 2;
  } else if (!goldenCookieUnlocked && mouseInButton(y + 150) && cookies >= goldenCookieCost) {
    cookies -= goldenCookieCost;
    goldenCookieUnlocked = true;
  } else if (mouseInButton(y + 180) && cookies >= quantumClickerCost) {
    cookies -= quantumClickerCost;
    cookiesPerClick += 20;
    quantumClickerCost *= 2;
  } else if (mouseInButton(y + 210) && cookies >= cookieDroneCost) {
    cookies -= cookieDroneCost;
    autoClickers += 20;
    cookieDroneCost *= 2;
  } else if (mouseInButton(y + 240) && cookies >= dimensionalMultCost) {
    cookies -= dimensionalMultCost;
    clickMultiplier *= 2;
    dimensionalMultCost *= 2;
  } else if (mouseInButton(y + 280) && cookies >= 1e8) {
    let gain = floor(cookies / 1e8);
    prestigePoints += gain;
    prestigeCount++;
    resetGame();
    showPrestigeScreen = true;
  }
}

function drawButton(label, y) {
  fill(200);
  if (mouseInButton(y)) fill(180);
  rect(width / 2 - 150, y, 300, 25);
  fill(0);
  text(label, width / 2, y + 12);
}

function mouseInButton(y) {
  return mouseX > width / 2 - 150 && mouseX < width / 2 + 150 && mouseY > y && mouseY < y + 25;
}

function drawPrestigeScreen() {
  background(240);
  textSize(20);
  text("Prestige Upgrades", width / 2, 40);
  textSize(14);
  text("Points: " + prestigePoints, width / 2, 70);

  let y = 120;
  drawButton("+1 Per Click (" + prestigePerClickBonus + ") - 1 PP", y);
  drawButton("+1/sec Auto (" + prestigeAutoBonus + ") - 1 PP", y + 30);
  drawButton("+1 Click Multiplier (" + prestigeMultiplierBonus + ") - 2 PP", y + 60);
  drawButton("Click Speed Up (" + prestigeClickSpeedBonus + "ms) - 3 PP", y + 90);
  drawButton("Golden Cookie +5s - 2 PP", y + 120);
  drawButton("Golden Cookie Cooldown -5s - 2 PP", y + 150);
  drawButton("Return", height - 40);
}

function handlePrestigeClick() {
  let y = 120;
  if (mouseInButton(y) && prestigePoints >= 1) {
    prestigePerClickBonus++;
    prestigePoints--;
  } else if (mouseInButton(y + 30) && prestigePoints >= 1) {
    prestigeAutoBonus++;
    prestigePoints--;
  } else if (mouseInButton(y + 60) && prestigePoints >= 2) {
    prestigeMultiplierBonus++;
    prestigePoints -= 2;
  } else if (mouseInButton(y + 90) && prestigePoints >= 3) {
    prestigeClickSpeedBonus += 50;
    prestigePoints -= 3;
  } else if (mouseInButton(y + 120) && prestigePoints >= 2) {
    prestigeGoldenCookieDuration += 5000;
    prestigePoints -= 2;
  } else if (mouseInButton(y + 150) && prestigePoints >= 2) {
    prestigeGoldenCookieCooldown -= 5000;
    prestigePoints -= 2;
  } else if (mouseInButton(height - 40)) {
    showPrestigeScreen = false;
  }
}

function resetGame() {
  cookies = 0;
  cookiesPerClick = 1;
  autoClickers = 0;
  clickMultiplier = 1;
  multiplierLevel = 1;
  manualClicks = 0;

  goldenCookieUnlocked = false;
  goldenCookieActive = false;
  goldenCookieUsedAt = -60000;

  clickUpgradeCost = 50 * pow(2, prestigeCount);
  autoUpgradeCost = 100 * pow(2, prestigeCount);
  multiplierUpgradeCost = 500 * pow(2, prestigeCount);
  megaClickerCost = 1000 * pow(2, prestigeCount);
  autoFactoryCost = 1500 * pow(2, prestigeCount);
  quantumClickerCost = 5000 * pow(2, prestigeCount);
  cookieDroneCost = 8000 * pow(2, prestigeCount);
  dimensionalMultCost = 12000 * pow(2, prestigeCount);
  goldenCookieCost = 2000 * pow(2, prestigeCount);
} 