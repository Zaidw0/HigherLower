export default async function handler(req, res) {
    const API_KEY = process.env.YT_API_KEY;
    const id = req.query.id;

    // Obtener datos del video
    const videoRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${API_KEY}&part=snippet,statistics`
    );
    const videoJson = await videoRes.json();
    const v = videoJson.items[0];

    // Obtener datos del canal
    const channelRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?id=${v.snippet.channelId}&key=${API_KEY}&part=snippet`
    );
    const channelJson = await channelRes.json();

    res.json({
        title: v.snippet.title,
        thumb: v.snippet.thumbnails.high.url,
        views: Number(v.statistics.viewCount),
        icon: channelJson.items[0].snippet.thumbnails.default.url
    });
}
