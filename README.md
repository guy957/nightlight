# Nightlight

A shared baby log for two phones: sleep, feeds, nappies, pumping, temperature, medicine and growth, with nap and feed predictions that start from Australian guidance and learn the baby's own rhythm. It installs to the Home Screen as a web app and works offline.

- **Your data stays yours.** Entries live in the family's own Firebase (Cloud Firestore) project. Nothing personal is stored in this repository.
- **Pairing.** Phones join with a private link from Settings, Pair a phone. Anyone with that link can read and add to the log, so share it only between parents.
- **More than one child.** Each phone chooses which child it's looking after; entries are tagged by child.
- **Plan.** A schedule creator for naps and bedtime, and optional custom awake times.
- **Type or say it.** Entries can be typed or spoken in plain English and are previewed before saving.
- **Reminders.** Nap, bedtime, feed and custom reminders arrive as notifications through a small reminder service (a Cloudflare Worker) that each family runs in its own free account. The worker's private key is never stored here.
- **Not medical advice.** Guidance comes from Tresillian, Raising Children Network, Red Nose, healthdirect and the AASM; the Guide tab links every source.

Licences: Firebase JavaScript SDK (Apache 2.0), qrcode-generator (MIT), Atkinson Hyperlegible and Young Serif fonts (SIL Open Font License 1.1).
