FROM mcr.microsoft.com/devcontainers/base:bookworm

# Full python3 (not just python3-minimal): skills shell out to `python3` for json and http.server.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends python3 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
