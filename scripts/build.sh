#!/bin/bash

REGISTRY="ghcr.io"
IMG_NAME="1e3ms/io.1e3ms.qrcodes"
IMG_PREFIX="${REGISTRY}/${IMG_NAME}"

scripts_path=$(dirname "$(realpath "$0")")
base_path=$(realpath "${scripts_path}"/..)

usage() {
  cat <<EOF >/dev/stderr
usage: $0 [options]

options:
  --image-prefix [VALUE]  (default: ${IMG_PREFIX})
  --no-cache
  --plain
EOF
}

args=()

while [ $# -gt 0 ]; do
  case ${1} in
  --image-prefix)
    IMG_PREFIX="${2}"
    shift 1
    ;;
  --no-cache)
    args=("${args[@]}" --no-cache)
    ;;
  --plain)
    args=("${args[@]}" --progress=plain)
    ;;
  *)
    echo "unknown option '${1}'" >/dev/stderr
    usage
    exit 1
    ;;
  esac

  shift 1
done

pushd "${base_path}" || exit 1

version="$(git rev-parse --short HEAD)"

docker build "${args[@]}" -t "${IMG_PREFIX}:${version}" \
  --target io.1e3ms.qrcodes . || exit 1
docker tag "${IMG_PREFIX}:${version}" "${IMG_PREFIX}:latest" || exit 1

popd || exit 1
