# ==============================================
# IDX dev.nix 환경 설정
# ==============================================
# 목적:
# - Node.js 및 live-server 설치
# - 루트 폴더 HTML 파일 실시간 웹 미리보기
# - 파일 변경 시 자동 새로고침
# - 기본 열 파일: index.html, README.md
# - IDX web preview 사용, PORT 환경 변수 자동 설정
# ==============================================

{ pkgs, ... }: {
  # 사용할 nixpkgs 채널
  channel = "stable-24.05";

  # 설치할 패키지 목록
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.live-server
  ];

  # 환경 변수 설정
  env = {};

  idx = {
    # 설치할 VSCode 확장
    extensions = [
      "google.gemini-cli-vscode-ide-companion"
    ];

    previews = {
      enable = true;

      previews = {
        web = {
          # 웹 프리뷰용 명령어
          command = ["npx" "live-server" "--port=$PORT" "--open=./" "--watch=./"];
          manager = "web";

          # PORT 환경 변수 설정
          env = {
            PORT = "$PORT";
          };
        };
      };
    };

    workspace = {
      # 워크스페이스 생성 시 기본 열 파일
      onCreate = {
        default.openFiles = [ "index.html" "README.md" ];
      };

      # 워크스페이스 시작 시 web preview 실행
      onStart = {
        start-web-preview = "true";
      };
    };
  };
}