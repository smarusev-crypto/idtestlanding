export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phone, section, task, comment } = req.body;

  const BOT_TOKEN = "8866381888:AAGkvFl8WngeLR59rO6R93qSi2QgwwuQ09U";
  const CHAT_ID = "390244830";

  const message = `🔥 *Новая заявка с сайта makeid.ru* 🔥\n\n` +
                  `👤 *Имя / Контакт:* ${name || 'Не указано'}\n` +
                  `📞 *Телефон / ТГ:* ${phone}\n` +
                  `📐 *Раздел:* ${section}\n` +
                  `📋 *Задача:* ${task}\n` +
                  (comment ? `💬 *Комментарий:* ${comment}` : '');

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    if (telegramRes.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: 'Failed to send to Telegram' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
