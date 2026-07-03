param(
    [Parameter(Mandatory=$true, HelpMessage="생성할 폴더 번호를 입력하세요 (예: 3)")]
    [int]$Number
)

$folderName = $Number.ToString("00")
$basePath = Join-Path $PSScriptRoot $folderName

if (Test-Path $basePath) {
    Write-Host "이미 존재하는 폴더입니다: $folderName" -ForegroundColor Yellow
    exit 1
}

New-Item -ItemType Directory -Path $basePath | Out-Null
New-Item -ItemType Directory -Path (Join-Path $basePath "styles") | Out-Null

$htmlContent = @"
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$folderName</title>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>

</body>
</html>
"@

Set-Content -Path (Join-Path $basePath "index.html") -Value $htmlContent -Encoding UTF8
New-Item -ItemType File -Path (Join-Path $basePath "styles\main.css") | Out-Null

Write-Host ""
Write-Host "생성 완료! $folderName/" -ForegroundColor Green
Write-Host "  +-- index.html" -ForegroundColor Cyan
Write-Host "  +-- styles/" -ForegroundColor Cyan
Write-Host "      +-- main.css" -ForegroundColor Cyan
