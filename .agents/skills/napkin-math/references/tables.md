# Napkin Math Reference Tables

Source: [sirupsen/napkin-math](https://github.com/sirupsen/napkin-math) — measured on GCP c4-standard-48-lssd (March 2026).

## Latency & Throughput

Numbers rounded for memorization, not faux precision.

| Operation                           | Latency | Throughput | 1 MiB  | 1 GiB  |
| ----------------------------------- | ------- | ---------- | ------ | ------ |
| Sequential Memory R/W (64 bytes)    | 0.5 ns  |            |        |        |
| ├ Single Thread                     |         | 20 GiB/s   | 50 μs  | 50 ms  |
| ├ Threaded                          |         | 200 GiB/s  | 5 μs   | 5 ms   |
| Network Same-Zone                   |         | 10 GiB/s   | 100 μs | 100 ms |
| Hashing, non-crypto (64 bytes)      | 10 ns   | 5 GiB/s    | 200 μs | 200 ms |
| Random Memory R/W (64 bytes)        | 20 ns   | 3 GiB/s    | 300 μs | 300 ms |
| Fast Serialization †                | N/A     | 1 GiB/s    | 1 ms   | 1s     |
| System Call                         | 300 ns  | N/A        | N/A    | N/A    |
| Hashing, crypto-safe (64 bytes)     | 100 ns  | 1 GiB/s    | 1 ms   | 1s     |
| Sequential SSD read (8 KiB)         | 1 μs    | 8 GiB/s    | 100 μs | 100 ms |
| Context Switch                      | 10 μs   | N/A        | N/A    | N/A    |
| Sequential SSD write, -fsync (8KiB) | 2 μs    | 3 GiB/s    | 300 μs | 300 ms |
| TCP Echo Server (32 KiB)            | 50 μs   | 500 MiB/s  | 2 ms   | 2s     |
| Random SSD Read (8 KiB)             | 100 μs  | 70 MiB/s   | 15 ms  | 15s    |
| Decompression                       | N/A     | 1 GiB/s    | 1 ms   | 1s     |
| Compression                         | N/A     | 500 MiB/s  | 2 ms   | 2s     |
| Sorting (64-bit integers)           | N/A     | 500 MiB/s  | 2 ms   | 2s     |
| Proxy (Envoy/Nginx/HAProxy)         | 50 μs   | ?          | ?      | ?      |
| Network within same region          | 250 μs  | 2 GiB/s    | 500 μs | 500 ms |
| Sequential SSD write, +fsync (8KiB) | 300 μs  | 30 MiB/s   | 30 ms  | 30s    |
| DB/Cache Query (MySQL/Redis/etc)    | 500 μs  | ?          | ?      | ?      |
| Serialization (JSON, Protobuf)      | N/A     | 100 MiB/s  | 10 ms  | 10s    |
| Sequential HDD Read (8 KiB)         | 10 ms   | 250 MiB/s  | 2 ms   | 2s     |
| Random HDD Read (8 KiB)             | 10 ms   | 0.7 MiB/s  | 2 s    | 30m    |
| Blob Storage GET (single conn)      | 80 ms   | 100 MiB/s  | 10 ms  | 10s    |
| Blob Storage LIST                   | 100 ms  |            |        |        |
| Blob Storage PUT (single conn)      | 200 ms  | 100 MiB/s  | 10 ms  | 10s    |
| Network NA East ↔ West              | 60 ms   | 25 MiB/s   | 40 ms  | 40s    |
| Network EU West ↔ NA East           | 80 ms   | 25 MiB/s   | 40 ms  | 40s    |

† "Fast" = binary wire protocol (flatbuffers, cap'n proto). Standard JSON/Protobuf is the slower row.

---

## Cost (monthly, per unit)

Approximate numbers consistent across major cloud providers.

| Resource              | Unit   | On-demand | 1y commit | Spot    |
| --------------------- | ------ | --------- | --------- | ------- |
| CPU                   | 1 core | $15       | $10       | $2      |
| GPU                   | 1      | $5,000    | $3,000    | $1,500  |
| Memory                | 1 GB   | $2        | $1        | $0.2    |
| Blob Storage (S3/GCS) | 1 GB   | $0.02     |           |         |
| Zonal HDD             | 1 GB   | $0.05     |           |         |
| Ephemeral SSD         | 1 GB   | $0.08     | $0.05     |         |
| Zonal SSD             | 1 GB   | $0.2      |           |         |
| Regional SSD          | 1 GB   | $0.35     |           |         |
| Network Same-Zone     | 1 GB   | $0        |           |         |
| Network Inter-Zone    | 1 GB   | $0.01     |           |         |
| Network Inter-Region  | 1 GB   | $0.02     |           |         |
| Network Internet Out  | 1 GB   | $0.1      |           |         |
| CDN Egress            | 1 GB   | $0.05     |           |         |
| Logs/Traces Ingest    | 1 GB   | $0.5      |           |         |
| Metrics               | 1000   | $20       |           |         |
| Warehouse Query       | 1 GB   | $0.005    |           |         |

Blob storage operations:

| Operation | Per 1M | Per 1000 |
| --------- | ------ | -------- |
| Reads     | $0.4   | $0.0004  |
| Writes    | $5     | $0.005   |

---

## Compression Ratios

| Data Type   | Ratio |
| ----------- | ----- |
| HTML        | 2-3x  |
| English     | 2-4x  |
| Source Code | 2-4x  |
| Executables | 2-3x  |
| RPC/API     | 5-10x |

Rule of thumb: each additional x in compression ratio costs ~10x in CPU time.

Note: use `10^n` notation in all calculations (e.g. `3 * 10^12` not `3,000,000,000,000`).
