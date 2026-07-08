const fs = require("fs");
const path = require("path");

const dir = __dirname;

// Collect all followers
const followersFiles = [
  "followers_1.json",
  "followers_2.json",
  "followers_3.json",
  "followers_4.json",
  "followers_5.json",
  "followers_6.json",
];

const followers = new Map();
for (const file of followersFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8"));
  for (const entry of data) {
    const item = entry.string_list_data[0];
    if (item) {
      followers.set(item.value, item.href);
    }
  }
}

// Collect who I'm following
const followingData = JSON.parse(
  fs.readFileSync(path.join(dir, "following.json"), "utf-8")
);
const following = new Map();
for (const entry of followingData.relationships_following) {
  const item = entry.string_list_data[0];
  if (item) {
    following.set(entry.title, { href: item.href, timestamp: item.timestamp });
  }
}

// Find non-reciprocal follows
const notFollowingBack = [];
for (const [username, data] of following) {
  if (!followers.has(username)) {
    notFollowingBack.push({ username, href: data.href, timestamp: data.timestamp });
  }
}

// Sort by timestamp, newest first
notFollowingBack.sort((a, b) => b.timestamp - a.timestamp);

// Write JSON
const jsonPath = path.join(dir, "not_following_back.json");
fs.writeFileSync(jsonPath, JSON.stringify(notFollowingBack, null, 2), "utf-8");
console.log(`Written: ${jsonPath} (${notFollowingBack.length} users)`);

// Write HTML
const htmlRows = notFollowingBack
  .map(
    (u) =>
      `    <tr><td><a href="${u.href}" target="_blank">${u.username}</a></td></tr>`
  )
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Not Following Back</title>
  <style>
    body { font-family: -apple-system, sans-serif; max-width: 600px; margin: 2rem auto; padding: 0 1rem; }
    h1 { font-size: 1.3rem; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 6px 0; }
    a { color: #0095f6; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .count { color: #666; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <h1>Not Following Back</h1>
  <div class="count">${notFollowingBack.length} users</div>
  <table>
${htmlRows}
  </table>
</body>
</html>`;

const htmlPath = path.join(dir, "not_following_back.html");
fs.writeFileSync(htmlPath, html, "utf-8");
console.log(`Written: ${htmlPath}`);
