# Anaconda, 비전공자도 이해하기 쉽게 정리해봤다

코딩 초보 입장에서 Anaconda가 뭔지, 왜 쓰는지, 어떻게 쓰는지 정리해봤다. 실습하면서 겪은 내용을 순서대로 풀었다.

---

## 1. Anaconda란?

집에는 주방, 화장실, 거실, 안방처럼 여러 방이 있다. 방마다 용도가 다르고, 놓여있는 도구도 다르다.

코딩 프로젝트도 마찬가지다. 프로젝트마다 필요한 라이브러리와 그 버전이 다르다. A 프로젝트는 파이썬 3.9가 필요하고, B 프로젝트는 3.11이 필요할 수도 있다. 이걸 한 곳에 다 섞어서 설치하면 서로 충돌이 난다.

**Anaconda**는 프로젝트별로 독립된 "방"(가상환경)을 만들어주는 관리자다. 방끼리 서로 간섭 없이 깔끔하게 분리해준다.

- 공식 사이트: https://www.anaconda.com
- 설치 파일 아카이브: https://repo.anaconda.com/archive/

---

## 2. 설치하기

### Windows 설치 순서

1. 아카이브 페이지에서 `Anaconda3-…-Windows-x86_64.exe` 다운로드
2. 설치 파일 더블클릭 → Next → I Agree → Just Me 선택
3. 설치 경로는 기본값 유지 → Next
4. **"Add Anaconda3 to my PATH" 체크** → Install → Finish

> PATH 체크를 빼먹으면 나중에 터미널에서 `conda` 명령어 자체가 안 먹힐 수 있으니 꼭 체크하자.

### 설치 확인

```bash
conda --version
conda info
python --version
```

이 세 줄이 에러 없이 잘 나오면 설치가 제대로 된 것이다.

---

## 3. 가상환경(방) 관리

### 환경 만들기

```bash
conda create -n 환경이름 python=3.10
```

예시:

```bash
conda create -n cv_env python=3.10
conda create -n nlp_env python=3.9
conda create -n myproject python=3.11
```

프로젝트 성격에 맞게 이름과 파이썬 버전을 다르게 줄 수 있다.

### 버전 확인

```bash
python --version
conda --version
```

### 환경 켜기 / 끄기

```bash
conda activate cv_env    # cv_env 방 안으로 들어가기
conda deactivate         # 방에서 나오기
```

방에 들어가면 터미널 프롬프트 맨 앞에 `(cv_env)`처럼 환경 이름이 붙는다. 이게 붙어야 그 환경이 활성화된 상태라는 뜻이다.

### 환경 목록 보기 / 삭제

```bash
conda env list             # 만들어둔 방 목록 확인
conda env remove -n cv_env # cv_env 방 삭제
```

### 유지보수

```bash
conda info          # 현재 conda 상태 확인
conda update conda   # conda 자체 업데이트
conda clean --all    # 캐시 등 불필요한 파일 정리
```

---

## 4. 패키지(도구) 설치 — pip

방(환경)에 들어간 상태에서 필요한 라이브러리를 설치한다.

```bash
pip install package-name
```

### 고급 설치 명령어

**여러 개 한 번에 설치**

```bash
pip install package1 package2 package3
```

**파일에 적힌 목록대로 한 번에 설치**

```bash
pip install -r requirements.txt
```

**특정 버전 정확히 지정해서 설치**

```bash
pip install package==1.2.3
```

**설치된 패키지 최신 버전으로 업그레이드**

```bash
pip install --upgrade package
```

**현재 설치된 패키지 목록 보기**

```bash
pip list
```

---

## 5. 환경 통째로 내보내기 & 공유하기

지금 만든 환경을 그대로 다른 컴퓨터에서 재현하고 싶을 때 쓴다.

### 환경 내보내기

```bash
conda env export > environment.yml
```

현재 환경의 설정(파이썬 버전, 설치된 패키지 등)을 `environment.yml` 파일 하나로 저장한다.

### 환경 복원하기

```bash
conda env create -f environment.yml
```

다른 컴퓨터에서 이 파일 하나로 똑같은 환경을 그대로 만들어낼 수 있다. 협업할 때나, 새 컴퓨터로 옮길 때 유용하다.

---

## 6. 의존성 추출 (고급)

프로젝트에 어떤 패키지가 필요한지 목록만 뽑아내고 싶을 때 쓰는 방법 두 가지.

### pip freeze

현재 환경에 설치된 **모든** 패키지를 버전과 함께 그대로 뽑아낸다.

```bash
pip freeze > requirements.txt
```

> 환경에 설치는 돼 있지만 실제 프로젝트에서 안 쓰는 패키지까지 전부 포함된다는 단점이 있다.

### pipreqs

실제 코드에서 **import한 패키지만** 골라서 자동으로 추출해준다. 훨씬 깔끔한 결과물이 나온다.

```bash
pipreqs --force --savepath=requirements.txt .
```

- `--force` : 기존 파일이 있어도 덮어쓰기
- `--savepath` : 저장할 파일 경로 지정
- `.` : 현재 폴더 기준으로 코드 스캔

---

## 정리

| 하고 싶은 것 | 명령어 |
|---|---|
| conda 설치 확인 | `conda --version` |
| 방 만들기 | `conda create -n 환경이름 python=3.10` |
| 방 들어가기 | `conda activate 환경이름` |
| 방 나오기 | `conda deactivate` |
| 방 목록 보기 | `conda env list` |
| 방 삭제 | `conda env remove -n 환경이름` |
| 도구 설치 | `pip install 패키지이름` |
| 방 내보내기 | `conda env export > environment.yml` |
| 방 복원하기 | `conda env create -f environment.yml` |
| 설치된 것 전부 목록화 | `pip freeze > requirements.txt` |
| 실제 쓰는 것만 목록화 | `pipreqs --force --savepath=requirements.txt .` |

핵심은 하나다. **프로젝트마다 독립된 방을 만들고, 그 안에서만 작업하고, 필요하면 그 방을 파일 하나로 통째로 내보내거나 공유한다.** 이 흐름만 기억하면 Anaconda는 어렵지 않다.

비밀번호pip install
비밀번호pipreqs