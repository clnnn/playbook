# Napkin Math Reference Tables

Source: [sirupsen/napkin-math](https://github.com/sirupsen/napkin-math) — rows that can be measured on a single host were re-measured on GCP c4-standard-48-lssd (Intel Xeon 6985P-C, 48 vCPU / 24 physical cores, 180 GB RAM, Ubuntu 22.04.5) on March 8, 2026.

## Latency & Throughput

Numbers rounded for memorization, not faux precision. Throughput and latency
columns deliberately don't always reconcile — they're rounded for easy math.

| Operation                            | Latency | Throughput | 1 MiB  | 1 GiB  |
| ------------------------------------ | ------- | ---------- | ------ | ------ |
| Sequential Memory R/W (64 bytes)     | 0.5 ns  |            |        |        |
| ├ Single Thread                      |         | 20 GiB/s   | 50 μs  | 50 ms  |
| ├ Threaded                           |         | 200 GiB/s  | 5 μs   | 5 ms   |
| Network Same-Zone                    |         | 10 GiB/s   | 100 μs | 100 ms |
| ├ Inside VPC                         |         | 10 GiB/s   | 100 μs | 100 ms |
| ├ Outside VPC                        |         | 3 GiB/s    | 300 μs | 300 ms |
| Hashing, non-crypto (64 bytes)       | 10 ns   | 5 GiB/s    | 200 μs | 200 ms |
| Random Memory R/W (64 bytes)         | 20 ns   | 3 GiB/s    | 300 μs | 300 ms |
| Fast Serialization †                 | N/A     | 1 GiB/s    | 1 ms   | 1s     |
| Fast Deserialization †               | N/A     | 1 GiB/s    | 1 ms   | 1s     |
| System Call                          | 300 ns  | N/A        | N/A    | N/A    |
| Hashing, crypto-safe (64 bytes)      | 100 ns  | 1 GiB/s    | 1 ms   | 1s     |
| Sequential SSD read (8 KiB)          | 1 μs    | 8 GiB/s    | 100 μs | 100 ms |
| Context Switch                       | 10 μs   | N/A        | N/A    | N/A    |
| Sequential SSD write, -fsync (8KiB)  | 2 μs    | 3 GiB/s    | 300 μs | 300 ms |
| TCP Echo Server (32 KiB)             | 50 μs   | 500 MiB/s  | 2 ms   | 2s     |
| Random SSD Read (8 KiB)              | 100 μs  | 70 MiB/s   | 15 ms  | 15s    |
| Decompression                        | N/A     | 1 GiB/s    | 1 ms   | 1s     |
| Compression                          | N/A     | 500 MiB/s  | 2 ms   | 2s     |
| Sorting (64-bit integers)            | N/A     | 500 MiB/s  | 2 ms   | 2s     |
| Proxy (Envoy/ProxySQL/Nginx/HAProxy) | 50 μs   | ?          | ?      | ?      |
| Network within same region           | 250 μs  | 2 GiB/s    | 500 μs | 500 ms |
| Premium network within zone/VPC      | 250 μs  | 25 GiB/s   | 50 μs  | 40 ms  |
| Sequential SSD write, +fsync (8KiB)  | 300 μs  | 30 MiB/s   | 30 ms  | 30s    |
| DB/Cache Query (MySQL/Redis/etc)     | 500 μs  | ?          | ?      | ?      |
| Serialization (JSON, Protobuf)       | N/A     | 100 MiB/s  | 10 ms  | 10s    |
| Deserialization (JSON, Protobuf)     | N/A     | 100 MiB/s  | 10 ms  | 10s    |
| Sequential HDD Read (8 KiB)          | 10 ms   | 250 MiB/s  | 2 ms   | 2s     |
| Random HDD Read (8 KiB)              | 10 ms   | 0.7 MiB/s  | 2 s    | 30m    |
| Blob Storage GET, if-not-match 304   | 30 ms   |            |        |        |
| Blob Storage GET, 1 conn (128 KiB)   | 80 ms   | 100 MiB/s  | 10 ms  | 10s    |
| Blob Storage GET, n conn (offsets)   | 80 ms   | NIC limit  |        |        |
| Blob Storage LIST                    | 100 ms  |            |        |        |
| Blob Storage PUT, 1 conn (128 KiB)   | 200 ms  | 100 MiB/s  | 10 ms  | 10s    |
| Blob Storage PUT, n conn (multipart) | 200 ms  | NIC limit  | 10 ms  | 10s    |
| Network NA Central ↔ East            | 25 ms   | 25 MiB/s   | 40 ms  | 40s    |
| Network NA Central ↔ West            | 40 ms   | 25 MiB/s   | 40 ms  | 40s    |
| Network NA East ↔ West               | 60 ms   | 25 MiB/s   | 40 ms  | 40s    |
| Network EU West ↔ NA East            | 80 ms   | 25 MiB/s   | 40 ms  | 40s    |
| Network EU West ↔ NA Central         | 100 ms  | 25 MiB/s   | 40 ms  | 40s    |
| Network EU West ↔ Singapore          | 160 ms  | 25 MiB/s   | 40 ms  | 40s    |
| Network NA West ↔ Singapore          | 180 ms  | 25 MiB/s   | 40 ms  | 40s    |

† "Fast" = binary wire protocol that mostly dumps bytes (flatbuffers, cap'n proto). Standard JSON/Protobuf is the slower row.

Blob storage caveats: single-connection GET/PUT throughput is a conservative
generic `100 MiB/s` (measured ~95 MiB/s on S3, ~190-200 MiB/s on GCS XML).
Explicit concurrent range GETs / multipart PUTs reach the host NIC limit
(~2 GiB/s on S3, ~5 GiB/s on GCS). First-byte latency cells are rougher
heuristics than the throughput cells.

Take everything with a grain of salt — unlikely to be more than 2-3x off.

---

## Cost (monthly, per unit)

Approximate numbers consistent across major cloud providers.

| Resource                | Unit   | On-demand | 1y commit | Spot    | Hourly spot |
| ----------------------- | ------ | --------- | --------- | ------- | ----------- |
| CPU                     | 1 core | $15       | $10       | $2      | $0.005      |
| GPU                     | 1      | $5,000    | $3,000    | $1,500  | $2          |
| Memory                  | 1 GB   | $2        | $1        | $0.2    | $0.0005     |
| Warehouse Storage       | 1 GB   | $0.02     |           |         |             |
| Blob Storage (S3/GCS)   | 1 GB   | $0.02     |           |         |             |
| Zonal HDD               | 1 GB   | $0.05     |           |         |             |
| Ephemeral SSD           | 1 GB   | $0.08     | $0.05     | $0.05   | $0.07       |
| Regional HDD            | 1 GB   | $0.1      |           |         |             |
| Zonal SSD               | 1 GB   | $0.2      |           |         |             |
| Regional SSD            | 1 GB   | $0.35     |           |         |             |
| Network Same-Zone       | 1 GB   | $0        |           |         |             |
| Network to/from Blob    | 1 GB   | $0        |           |         |             |
| Network Ingress         | 1 GB   | $0        |           |         |             |
| L4 Load Balancer        | 1 GB   | $0.008    |           |         |             |
| Network Inter-Zone      | 1 GB   | $0.01     |           |         |             |
| Network Inter-Region    | 1 GB   | $0.02     |           |         |             |
| Network Internet Out †  | 1 GB   | $0.1      |           |         |             |
| CDN Egress              | 1 GB   | $0.05     |           |         |             |
| CDN Fill ‡              | 1 GB   | $0.01     |           |         |             |
| Warehouse Query         | 1 GB   | $0.005    |           |         |             |
| Logs/Traces Ingest ♣    | 1 GB   | $0.5      |           |         |             |
| Metrics                 | 1000   | $20       |           |         |             |
| EKM Keys                | 1      | $1        |           |         |             |

† Network leaving your cloud provider (e.g. GCP → S3, or serving HTML to a client).

‡ Also incurs a per-cache-fill fee close to blob storage write cost.

♣ Standard among logging providers; Datadog differs ($0.1 per GB ingested plus ~$1.5 per 1M for 7d retention).

Blob storage operations (fewer, larger files is cheaper):

| Operation      | Per 1M | Per 1000 |
| -------------- | ------ | -------- |
| Reads          | $0.4   | $0.0004  |
| Writes         | $5     | $0.005   |
| EKM Encryption | $3     | $0.003   |

---

## Compression Ratios

| Data Type   | Ratio |
| ----------- | ----- |
| HTML        | 2-3x  |
| English     | 2-4x  |
| Source Code | 2-4x  |
| Executables | 2-3x  |
| RPC/API     | 5-10x |
| SSL         | -2%   |

Rule of thumb: each additional x in compression ratio costs ~10x in CPU time.
E.g. English Wikipedia at 2x runs ~200 MiB/s, 3x at ~20 MiB/s, 4x at ~1 MB/s.
Ratios are stable across algorithms; speeds vary by an order of magnitude.

Note: use `10^n` notation in all calculations (e.g. `3 * 10^12` not `3,000,000,000,000`).
