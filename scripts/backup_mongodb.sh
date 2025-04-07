#!/bin/bash

# 변수 설정
BACKUP_DIR="$HOME/mongodb_backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="zipda"
BACKUP_PATH="$BACKUP_DIR/$DB_NAME-$DATE"

# 컬러 설정
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# 로그 함수
log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 백업 디렉토리 확인 및 생성
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
    log_success "백업 디렉토리 생성됨: $BACKUP_DIR"
fi

# MongoDB 백업 실행
echo "MongoDB 백업 시작..."
if mongodump --db "$DB_NAME" --out "$BACKUP_PATH"; then
    log_success "백업 완료: $BACKUP_PATH"
    
    # 30일 이상 된 백업 삭제
    find "$BACKUP_DIR" -type d -mtime +30 -exec rm -rf {} \;
    log_success "30일 이상 된 백업 정리 완료"
    
    # 백업 크기 확인
    BACKUP_SIZE=$(du -sh "$BACKUP_PATH" | cut -f1)
    log_success "백업 크기: $BACKUP_SIZE"
else
    log_error "백업 실패"
    exit 1
fi

# 백업 파일 압축
echo "백업 파일 압축 중..."
if tar -czf "$BACKUP_PATH.tar.gz" -C "$BACKUP_DIR" "$(basename "$BACKUP_PATH")"; then
    log_success "압축 완료: $BACKUP_PATH.tar.gz"
    # 압축 후 원본 디렉토리 삭제
    rm -rf "$BACKUP_PATH"
else
    log_error "압축 실패"
    exit 1
fi

# 백업 목록 출력
echo -e "\n현재 백업 목록:"
ls -lh "$BACKUP_DIR" 