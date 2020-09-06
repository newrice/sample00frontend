# sample00frontend

# build

### node npm yarn install

- `yum install nodejs npm`
- `npm install -g yarn`

### npm と yarn が入った環境で以下を実行

- `git clone https://github.com/newrice/sample00frontend.git`
- `cd sample00frontend`
  - `./src/setting/setting.json`の`url`の値を実際のホスト名(か ip)に変更してください。
- `yarn`
- `yarn install`
- `yarn build`
- `mv -f ./build <移動先のdir()>`
  - webapps/build になれば OK
  - `http://<ホスト>:<ポート>/build`でアクセスできます
