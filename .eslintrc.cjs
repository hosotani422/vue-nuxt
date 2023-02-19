module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    es2017: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: `module`,
  },
  rules: {
    /**
     * Possible Errors
     * JavaScriptコードで発生する可能性のある構文エラーまたは論理エラーに関連するルール
     */
    // forカウンターが間違った方向に推移すると無限にループします [recommended: ●, fix: ×]
    'for-direction': [`error`],
    // ゲッターにreturnを強制します [recommended: ●, fix: ×]
    // allowImplicit: returnで暗黙的にundefinedを返却することを許可します
    'getter-return': [`error`, {allowImplicit: false}],
    // Promise実行関数に非同期を許可しない [recommend: ●, fix: ×]
    'no-async-promise-executor': [`error`],
    // ループ内でのawaitを禁止する [recommend: ×, fix: ×]
    // ※ 順に実行しなければならない場合もある
    'no-await-in-loop': [`off`],
    // -0との比較を許可しない [recommend: ●, fix: ×]
    'no-compare-neg-zero': [`error`],
    // 条件ステートメントで代入演算子を許可しない [recommend: ●, fix: ×]
    // except-parens: 括弧で囲まれている場合にのみ許可します
    // always: すべて禁止します
    'no-cond-assign': [`error`, `except-parens`],
    // consoleの使用を許可しない [recommend: ×, fix: ×]
    // allow: 許可するメソッド名(文字列配列) [`debug`, `info`, `log`, `warn`, `error`]
    'no-console': [`error`],
    // 条件に定数式を許可しない [recommend: ●, fix: ×]
    // checkLoops: ループ内で許可しない
    'no-constant-condition': [`error`, {checkLoops: true}],
    // 正規表現で制御文字を許可しない [recommend: ●, fix: ×]
    'no-control-regex': [`error`],
    // debuggerの使用を禁止する [recommend: ●, fix: ×]
    'no-debugger': [`error`],
    // functionの重複した引数を許可しない [recommend: ●, fix: ×]
    'no-dupe-args': [`error`],
    // if-else-ifの重複した条件を許可しない [recommend: ●, fix: ×]
    'no-dupe-else-if': [`error`],
    // オブジェクトリテラルの重複キーを許可しない [recommend: ●, fix: ×]
    'no-dupe-keys': [`error`],
    // caseの重複した条件を許可しない [recommend: ●, fix: ×]
    'no-duplicate-case': [`error`],
    // 空のブロックステートメントを許可しない [recommend: ●, fix: ×]
    // allowEmptyCatch: catchの空を許可する
    'no-empty': [`error`, {allowEmptyCatch: false}],
    // 正規表現で空の文字クラスを許可しない [recommend: ●, fix: ×]
    'no-empty-character-class': [`error`],
    // catchで例外の再割り当てを許可しない [recommend: ●, fix: ×]
    'no-ex-assign': [`error`],
    // 不要なbooleanキャストを許可しない [recommend: ●, fix: ●]
    // enforceForLogicalOperands: 論理式内で追加のboolean値についてチェックします ※ 動作不安定
    'no-extra-boolean-cast': [`error`],
    // 不要な括弧を許可しない [recommend: ×, fix: ●]
    // ※ 複雑な式を括弧で囲むと意図が明確になり解読しやすくなる(no-mixed-operators)
    // ※ TypeScript競合
    'no-extra-parens': [`off`],
    // 不要なセミコロンを許可しない [recommend: ●, fix: ●]
    // ※ TypeScript競合
    // 'no-extra-semi': [`error`],
    'no-extra-semi': [`off`],
    // function宣言の再割り当てを許可しない [recommend: ●, fix: ×]
    'no-func-assign': [`error`],
    // インポートされたバインディングへの割り当てを許可しない [recommend: ●, fix: ×]
    'no-import-assign': [`error`],
    // ネストされたブロック内のvar宣言またはfunction宣言を許可しない [recommend: ●, fix: ×]
    // functions: ネストされたブロックでのfunction宣言を禁止します
    // both: ネストされたブロックでの禁止function宣言とvar宣言を禁止します
    'no-inner-declarations': [`error`, `both`],
    // RegExpコンストラクターで無効な正規表現文字列を許可しない [recommend: ●, fix: ×]
    // allowConstructorFlags: 追加で許可するフラグ(配列)
    'no-invalid-regexp': [`error`, {allowConstructorFlags: [`g`, `i`, `m`, `s`, `u`, `y`]}],
    // 不規則な空白を許可しない [recommend: ●, fix: ×]
    // skipStrings: 文字列リテラル内の空白文字を許可します
    // skipComments: コメントに空白文字を許可します
    // skipRegExps: 正規表現リテラルで空白文字を許可します
    // skipTemplates: テンプレートリテラルで空白文字を許可します
    'no-irregular-whitespace': [`error`,
      {skipStrings: false, skipComments: false, skipRegExps: false, skipTemplates: false}],
    // 文字クラス構文で複数のコードポイントで作成された文字を許可しない [recommend: ●, fix: ×]
    'no-misleading-character-class': [`error`],
    // グローバルオブジェクトプロパティの関数としての呼び出しを許可しない [recommend: ●, fix: ×]
    'no-obj-calls': [`error`],
    // Object.prototypesビルトインの直接の使用を許可しない [recommend: ●, fix: ×]
    'no-prototype-builtins': [`error`],
    // 正規表現リテラルに複数のスペースを許可しない [recommend: ●, fix: ●]
    'no-regex-spaces': [`error`],
    // セッターからの戻り値を許可しない [recommend: ●, fix: ×]
    'no-setter-return': [`error`],
    // コンマの前に要素がない疎配列リテラルを許可しない [recommend: ●, fix: ×]
    'no-sparse-arrays': [`error`],
    // 通常の文字列でテンプレートリテラルプレースホルダー構文を許可しない [recommend: ×, fix: ×]
    // ※ `${}`文字列が必要となる可能性を否定できない
    'no-template-curly-in-string': [`off`],
    // 紛らわしい複数行式を許可しない [recommend: ●, fix: ×]
    'no-unexpected-multiline': [`error`],
    // 到達不能コードを禁止 [recommend: ●, fix: ×]
    'no-unreachable': [`error`],
    // finallyブロック内の制御フローを許可しない [recommend: ●, fix: ×]
    'no-unsafe-finally': [`error`],
    // 関係演算子の左オペランドの否定を許可しません [recommend: ●, fix: ×]
    // enforceForOrderingRelations: 関係演算子の左側の否定を許可しません
    'no-unsafe-negation': [`error`, {enforceForOrderingRelations: true}],
    // 正規表現での役に立たない後方参照を許可しない [recommend: ×, fix: ×]
    // ※ version7.0.0以降でサポート
    'no-useless-backreference': [`off`],
    // awaitまたはyieldの使用が原因で競合状態を引き起こす可能性がある割り当てを禁止する [recommend: ×, fix: ×]
    'require-atomic-updates': [`off`],
    // NaNをチェックするときにisNaN()呼び出しを要求する [recommend: ●, fix: ×]
    // enforceForSwitchCase: case NaNとswitch(NaN)の使用を禁止します
    // enforceForIndexOf: indexOf(NaN)またはlastIndexOf(NaN)の使用を禁止します
    'use-isnan': [`error`, {enforceForSwitchCase: true, enforceForIndexOf: true}],
    // typeofに対して有効な文字列式の比較を強制する [recommend: ●, fix: ×]
    // requireStringLiterals: 文字列リテラル以外の値との比較を禁止します
    'valid-typeof': [`error`, {requireStringLiterals: true}],

    /**
     * Best Practices
     * 問題を回避するために役立つより良い方法に関連するルール
     */
    // オブジェクトとクラスのセッター/ゲッターをペアで適用します [recommend: ×, fix: ×]
    // getWithoutSet: ゲッターなしのセッターに対して警告が表示されます
    // setWithoutGet: セッターのないゲッターに対して警告が表示されます
    // enforceForClassMembers: クラスのゲッター/セッターに追加で適用されます
    'accessor-pairs': [`error`,
      {getWithoutSet: true, setWithoutGet: true, enforceForClassMembers: true}],
    // 配列メソッドのコールバックにreturnを適用します [recommend: ×, fix: ×]
    // allowImplicit: returnで暗黙的にundefinedを返すことができます
    // checkForEach: forEachでもチェックします ※ 動作不安定
    'array-callback-return': [`error`, {allowImplicit: false}],
    // 変数をブロックスコープとして扱います [recommend: ×, fix: ×]
    'block-scoped-var': [`error`],
    // インスタンスメソッドがthisを利用することを強制する [recommend: ×, fix: ×]
    // exceptMethods: 警告を無視するメソッド名(配列)
    'class-methods-use-this': [`error`],
    // 循環的複雑度の制限 [recommend: ×, fix: ×]
    // ※ 制限値を指定するのは困難
    complexity: [`off`],
    // return値を常に指定するか、絶対に指定しないように要求する [recommend: ×, fix: ×]
    // treatUndefinedAsUnspecified: return値としてundefinedを禁止する
    'consistent-return': [`error`, {treatUndefinedAsUnspecified: true}],
    // ブロックの周りの中括弧の規則に従う必要があります [recommend: ×, fix: ●]
    // all: 常に中括弧ありとする
    // multi: 単一ステートメント時に中括弧なし、複数ステートメント時に中括弧ありとする
    // multi-line: 中括弧ありなしどちらでも良いが、中括弧なしの場合はシングルラインとする
    // multi-or-nest: 単一ステートメント時に中括弧なしとするが、ネストしている場合は中括弧ありとする
    // consistent: 一貫した規則に従う
    curly: [`error`, `all`],
    // Switchステートメントでデフォルトを必須にする [recommend: ×, fix: ×]
    // commentPattern: デフォルトの/^no default$/iコメントテストパターンを変更します
    // ※ ifにelseが必要ない場合があるのと同様にdefaultが必要ない場合がある
    'default-case': [`off`],
    // switchステートメントのデフォルト句を最後にする [recommend: ×, fix: ×]
    // ※ version7.0.0以降でサポート
    'default-case-last': [`off`],
    // デフォルトのパラメーターを最後にする [recommend: ×, fix: ×]
    // ※ TypeScript競合
    // 'default-param-last': [`error`],
    'default-param-last': [`off`],
    // 改行時のドットの位置を指定する [recommend: ×, fix: ●]
    // object: ドットはオブジェクト部分と同じ行にある必要があります
    // property: ドットはプロパティ部分と同じ行にある必要があります
    'dot-location': [`error`, `property`],
    // オブジェクトリテラルにドット表記が必要 [recommend: ×, fix: ●]
    // allowKeywords: 予約語プロパティのドット表記を許可します
    // allowPattern: パターンに一致するプロパティ名のブラケット表記を許可します
    'dot-notation': [`error`, {allowKeywords: true}],
    // ==ではなく===で比較する [recommend: ×, fix: ●]
    // always: 常に使用を強制します
    // null: nullの処理方法 {always: 常に使用する, never: 常に使用しない, ignore: 制限を適用しない}
    // smart: リテラル値の比較、typeof、nullの場合を除き、使用を強制します
    eqeqeq: [`error`, `smart`],
    // 同じプロパティのセッターとゲッターは、互いに隣接して定義する [recommend: ×, fix: ×]
    // anyOrder: 順序を強制しません
    // getBeforeSet: セッターの前にゲッターを定義する必要があります
    // setBeforeGet: ゲッターの前にセッターを定義する必要があります
    'grouped-accessor-pairs': [`error`, `setBeforeGet`],
    // オブジェクトをforinループする際は、プロトタイププロパティを排除する必要があります [recommend: ×, fix: ×]
    'guard-for-in': [`error`],
    // ファイルあたりのクラスの最大数を強制する [recommend: ×, fix: ×]
    'max-classes-per-file': [`error`, 1],
    // alert、confirm、promptの使用を許可しない [recommend: ×, fix: ×]
    'no-alert': [`error`],
    // arguments.callerおよびarguments.calleeを使用不可能にします [recommend: ×, fix: ×]
    'no-caller': [`error`],
    // ブロックでラップされていないcase/default句での字句宣言を許可しない [recommend: ●, fix: ×]
    'no-case-declarations': [`error`],
    // コンストラクターでの戻り値を許可しない [recommend: ×, fix: ×]
    'no-constructor-return': [`error`],
    // 除算のように見える正規表現を許可しない [recommend: ×, fix: ●]
    'no-div-regex': [`error`],
    // ifにreturnが含まれている場合、elseは不要になります [recommend: ×, fix: ●]
    // allowElseIf: elseif復帰後のブロックを許可します
    'no-else-return': [`error`, {allowElseIf: true}],
    // 空の関数を許可しない [recommend: ×, fix: ×]
    // allow: 空の関数を許可する種類のリスト
    // ⇒ functions: 通常の関数
    // ⇒ arrowFunctions: アロー関数
    // ⇒ generatorFunctions: ジェネレータ関数
    // ⇒ methods: クラスメソッドとオブジェクトリテラルのメソッド
    // ⇒ generatorMethods: クラスメソッドとジェネレーターを使用したオブジェクトリテラルのメソッド
    // ⇒ getters: ゲッター
    // ⇒ setters: セッター
    // ⇒ constructors: クラスコンストラクタ
    // ⇒ asyncFunctions: 非同期関数
    // ⇒ asyncMethods: オブジェクトリテラルの非同期クラスメソッドとメソッド
    // ※ TypeScript競合
    // 'no-empty-function': [`error`],
    'no-empty-function': [`off`],
    // 分解を使用する場合、空の破壊パターンを許可しない [recommend: ●, fix: ×]
    'no-empty-pattern': [`error`],
    // Null比較を許可しない [recommend: ×, fix: ×]
    'no-eq-null': [`off`],
    // evalを許可しない [recommend: ×, fix: ×]
    // allowIndirect: evalへの間接呼び出しを許可する
    'no-eval': [`error`, {allowIndirect: false}],
    // ネイティブオブジェクトの拡張を許可しない [recommend: ×, fix: ×]
    // exceptions: 拡張を許可するビルトインのリスト
    'no-extend-native': [`error`],
    // 不要なbind関数を許可しない [recommend: ×, fix: ●]
    'no-extra-bind': [`error`],
    // 不要なラベルを許可しない [recommend: ×, fix: ●]
    'no-extra-label': [`error`],
    // caseステートメントのフォールスルーを許可しない [recommend: ●, fix: ×]
    // commentPattern: 意図的なフォールスルーの為、コメント文字列を変更します
    'no-fallthrough': [`error`],
    // 浮動小数点を許可しない [recommend: ×, fix: ●]
    'no-floating-decimal': [`error`],
    // ネイティブオブジェクトまたは読み取り専用グローバル変数への割り当てを許可しない [recommend: ●, fix: ×]
    // exceptions: 再割り当てを許可する組み込みのリスト
    'no-global-assign': [`error`],
    // 短い表記での型変換を禁止します [recommend: ×, fix: ●]
    // boolean: 型の短いboolean型変換を警告します
    // number: 型の短いnumber型変換を警告します
    // string: 型の短いstring型変換を警告します
    // allow: 許容される各エントリ [`~`, `!!`, `+`, `*`]
    'no-implicit-coercion': [`error`, {boolean: true, number: true, string: true}],
    // グローバルスコープで宣言を許可しない [recommend: ×, fix: ×]
    // lexicalBindings: const、let、classのチェックを有効にします
    'no-implicit-globals': [`error`, {lexicalBindings: true}],
    // 暗黙のevalを許可しない [recommend: ×, fix: ×]
    'no-implied-eval': [`error`],
    // クラスまたはクラスのようなオブジェクトの外部にあるthisキーワードを禁止します [recommend: ×, fix: ×]
    // capIsConstructor: 名前が大文字で始まる関数がコンストラクタであるという仮定を有効にします
    'no-invalid-this': [`error`, {capIsConstructor: false}],
    // __iterator__を許可しない [recommend: ×, fix: ×]
    'no-iterator': [`error`],
    // ラベルを許可しない [recommend: ×, fix: ×]
    // allowLoop: ループに固執しているラベルを許可します
    // allowSwitch: switchに固執しているラベルを許可します
    'no-labels': [`error`, {allowLoop: false, allowSwitch: false}],
    // 不要なブロックを許可しない [recommend: ×, fix: ×]
    'no-lone-blocks': [`error`],
    // ループ内の関数を許可しない [recommend: ×, fix: ×]
    'no-loop-func': [`error`],
    // マジックナンバーを許可しない [recommend: ×, fix: ×]
    // ignore: 許可する数値の配列
    // ignoreArrayIndexes: 配列インデックスの数値を許可する
    // enforceConst: 数値の変数宣言でconstをチェックする
    // detectObjects: オブジェクトのプロパティをチェックする
    // ※ TypeScript競合
    // ※ 管理が増えるので対応しない
    'no-magic-numbers': [`off`],
    // 複数のスペースを許可しない [recommend: ×, fix: ●]
    // ignoreEOLComments: 行末にあるコメントの前の複数のスペースを無視します
    // exceptions: 無視するノードを指定します
    'no-multi-spaces': [`error`, {ignoreEOLComments: false}],
    // 複数行文字列を許可しない [recommend: ×, fix: ×]
    'no-multi-str': [`error`],
    // 変数に格納しないnewを許可しない [recommend: ×, fix: ×]
    'no-new': [`error`],
    // 関数コンストラクターを許可しない [recommend: ×, fix: ×]
    'no-new-func': [`error`],
    // プリミティブラッパーのインスタンスを許可しない [recommend: ×, fix: ×]
    'no-new-wrappers': [`error`],
    // 8進数リテラルを許可しない [recommend: ●, fix: ×]
    'no-octal': [`error`],
    // 文字列リテラルでの8進エスケープシーケンスを許可しない [recommend: ×, fix: ×]
    'no-octal-escape': [`error`],
    // 関数パラメーターの再割り当てを禁止 [recommend: ×, fix: ×]
    // props: プロパティの再割り当てを禁止
    // ignorePropertyModificationsFor: プロパティの再割り当てを無視するパラメーター名のリスト
    // ignorePropertyModificationsForRegex: プロパティの再割り当てを無視するパラメーターパターンのリスト
    // ※ 要素を直接操作することは起こりうる
    'no-param-reassign': [`off`],
    // __proto__の使用を許可しない [recommend: ×, fix: ×]
    'no-proto': [`error`],
    // 変数の再宣言を許可しない [recommend: ●, fix: ×]
    // builtinGlobals: グローバルスコープ内の組み込みの再宣言をチェックします
    'no-redeclare': [`error`, {builtinGlobals: true}],
    // 特定のオブジェクトプロパティを許可しない [recommend: ×, fix: ×]
    // object: オブジェクト名
    // property: プロパティ名
    // message: メッセージ
    // ※ 必要時に追加する
    'no-restricted-properties': [`off`],
    // returnでの割り当てを禁止 [recommend: ×, fix: ×]
    // except-parens: 括弧で囲まれていない限り、割り当てを禁止します
    // always: すべての割り当てを禁止します
    'no-return-assign': [`error`, `always`],
    // return awaitを許可しない [recommend: ×, fix: ×]
    'no-return-await': [`error`],
    // スクリプトURLを許可しない [recommend: ×, fix: ×]
    'no-script-url': [`error`],
    // 自己割り当てを許可しない [recommend: ●, fix: ×]
    // props: プロパティの自己割り当てを警告します
    'no-self-assign': [`error`, {props: true}],
    // 自己比較を許可しない [recommend: ×, fix: ×]
    'no-self-compare': [`error`],
    // カンマ演算子の使用を許可しない [recommend: ×, fix: ×]
    'no-sequences': [`error`],
    // 例外としてスローできるものを制限する [recommend: ×, fix: ×]
    'no-throw-literal': [`error`],
    // ループの変更されていない条件を許可しない [recommend: ×, fix: ×]
    'no-unmodified-loop-condition': [`error`],
    // 未使用の式を許可しない [recommend: ×, fix: ×]
    // allowShortCircuit: 式で短絡評価を使用できます
    // allowTernary: 式で三項演算子を使用できます
    // allowTaggedTemplates: タグ付きテンプレートリテラルを使用できます
    // ※ TypeScript競合
    // 'no-unused-expressions': [`error`, {
    //   allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true}],
    'no-unused-expressions': [`off`],
    // 未使用のラベルを許可しない [recommend: ●, fix: ●]
    'no-unused-labels': [`error`],
    // 不要なcallとapplyを禁止します [recommend: ×, fix: ×]
    'no-useless-call': [`error`],
    // 不要なcatchを許可しない [recommend: ●, fix: ×]
    'no-useless-catch': [`error`],
    // 文字列の不必要な連結を許可しない [recommend: ×, fix: ×]
    'no-useless-concat': [`error`],
    // 不要なエスケープの使用を許可しない [recommend: ●, fix: ×]
    'no-useless-escape': [`error`],
    // 冗長なreturnを許可しない [recommend: ×, fix: ●]
    'no-useless-return': [`error`],
    // voidの使用を禁止します [recommend: ×, fix: ×]
    // allowAsStatement: ステートメントとして使用できるように設定します ※ 動作不安定
    'no-void': [`error`],
    // 警告コメントを許可しない [recommend: ×, fix: ×]
    // terms: 一致する用語のリスト
    // location: コメント内で一致をチェックする位置 [`start`, `anywhere`]
    'no-warning-comments': [`error`, {terms: [`todo`, `fixme`, `xxx`], location: `start`}],
    // withを許可しない [recommend: ●, fix: ×]
    'no-with': [`error`],
    // 正規表現で名前付きキャプチャグループを使用することを提案する [recommend: ×, fix: ×]
    // ※ 名前付きキャプチャグループが必要とは限らない
    'prefer-named-capture-group': [`off`],
    // PromiseのrejectにErrorオブジェクトを使用する必要があります [recommend: ×, fix: ×]
    // allowEmptyReject: 引数なしの呼び出しを許可します
    'prefer-promise-reject-errors': [`error`, {allowEmptyReject: false}],
    // 正規表現リテラルを優先してRegExpの使用を許可しない [recommend: ×, fix: ×]
    'prefer-regex-literals': [`error`],
    // parseIntの2番目の引数である基数を強制します [recommend: ×, fix: ×]
    // always: 基数の提供を強制します
    // as-needed: 基数が10の提供を許可しない
    radix: [`error`, `always`],
    // awaitのない非同期関数を許可しない [recommend: ×, fix: ×]
    'require-await': [`error`],
    // RegExpでuフラグの使用を強制する [recommend: ×, fix: ×]
    'require-unicode-regexp': [`error`],
    // 変数宣言をスコープの最上位にする必要があります [recommend: ×, fix: ×]
    // ※ 最上位以外の位置に宣言を必要とする時もある
    'vars-on-top': [`off`],
    // 即時に呼び出される関数式をラップする必要がある [recommend: ×, fix: ●]
    // outside: 呼び出し式を常にラップすることを強制します
    // inside: 関数式を常にラップすることを強制します
    // any: どちらのスタイルも許可します
    // functionPrototypeMethods: ラッピング関数式をcall、applyで呼び出します
    'wrap-iife': [`error`, `inside`, {functionPrototypeMethods: true}],
    // ヨーダ条件を要求または禁止する [recommend: ×, fix: ●]
    // never: ヨーダ条件であってはなりません
    // always: リテラル値が常に最初に来る必要があります
    // exceptRange: 範囲の比較の場合は例外とする（`never`時のみ）
    // onlyEquality: 等価演算子の場合は例外とする（`never`時のみ）
    yoda: [`error`, `never`, {exceptRange: false, onlyEquality: false}],

    /**
     * Strict Mode
     * 厳格モードに関連するルール
     */
    // 'use strict'を要求または禁止する [recommend: ×, fix: ●]
    // safe: CommonJSモジュールと見なした場合`global`そうでない場合`function`とする
    // global: グローバルスコープに1つの'use strict'が必要です
    // function: 各関数宣言または式のトップレベルに1つの'use strict'が必要です
    // never: ストリクトモードディレクティブを許可しません
    strict: [`error`, `never`],

    /**
     * Variables
     * 変数宣言に関連するルール
     */
    // 変数宣言での初期化を要求または禁止する [recommend: ×, fix: ×]
    // always: 宣言時の初期化を強制する
    // never: 宣言時の初期化を禁止する
    // ignoreForLoopInit: forループで宣言の初期化を許可する（`never`時のみ）
    // ※ TypeScript競合
    // 'init-declarations': [`error`, `always`],
    'init-declarations': [`off`],
    // 変数の削除を許可しない [recommend: ●, fix: ×]
    'no-delete-var': [`error`],
    // 変数と名前を共有するラベルを許可しない [recommend: ×, fix: ×]
    'no-label-var': [`error`],
    // 特定のグローバル変数を許可しない [recommend: ×, fix: ×]
    // name: グローバル変数名
    // message: カスタムメッセージ
    // ※ 必要に応じて追記する
    'no-restricted-globals': [`off`],
    // 外部スコープの変数と同じ名前の変数を許可しない [recommend: ×, fix: ×]
    // builtinGlobals: 組み込みグローバル変数と同じ名前を許可しない
    // hoist: [`functions`, `all`, `never`]
    // ⇒ functions: 外部関数と同じ名前を許可しない
    // ⇒ all: 外部変数/関数と同じ名前を許可しない
    // ⇒ never: 外部変数/関数と同じ名前を許可する
    // allow: 許可された識別子名の配列
    'no-shadow': [`error`, {builtinGlobals: true, hoist: `all`}],
    // グローバルオブジェクトや識別子の再定義を許可しない [recommend: ●, fix: ×]
    'no-shadow-restricted-names': [`error`],
    // 宣言されていない変数を許可しない [recommend: ●, fix: ×]
    // typeof: typeofチェック内で使用される変数について警告します
    // ※ TypeScript使用時は型定義で宣言されている場合に不都合
    'no-undef': [`off`],
    // undefinedへの初期化を許可しない [recommend: ×, fix: ●]
    'no-undef-init': [`error`],
    // undefined変数の使用を許可しない [recommend: ×, fix: ×]
    'no-undefined': [`error`],
    // 未使用の変数を許可しない [recommend: ●, fix: ×]
    // vars: {all: すべての変数をチェック, local: ローカル変数のみチェック}
    // varsIgnorePattern: チェックしない変数を指定します
    // args: {`after-used`: 最後に使用された引数の後方をチェック, `all`: すべてチェック, `none`: チェックしない}
    // argsIgnorePattern: チェックしない引数を指定します
    // caughtErrors: {none: エラー引数をチェックしません, all: エラー引数をチェックします}
    // caughtErrorsIgnorePattern: チェックしないエラー引数を指定します
    // ignoreRestSiblings: Restプロパティを使用した場合、残りのプロパティの兄弟は無視されます
    // ※ TypeScript競合
    // 'no-unused-vars': [`error`, {
    //   vars: `all`, varsIgnorePattern: `^_`, args: `all`, argsIgnorePattern: `^_`,
    //   caughtErrors: `all`, caughtErrorsIgnorePattern: `^_`, ignoreRestSiblings: false}],
    'no-unused-vars': [`off`],
    // 早期使用を許可しない [recommend: ×, fix: ×]
    // variables: 変数宣言をチェックする
    // functions: 関数宣言をチェックする
    // classes: クラス宣言をチェックする
    // ※ TypeScript競合
    // ※ 記述の前後で実行タイミングは判断できない
    'no-use-before-define': [`off`],

    /**
     * Stylistic Issues
     * スタイルのガイドラインに関連するルール
     */
    // 配列括弧に改行を強制する [recommend: ×, fix: ●]
    // always: 括弧内に改行が必要です
    // never: 括弧内に改行が不要です
    // consistent: ブラケットの各ペアに対して改行を一貫して使用する
    // multiline: 要素内または要素間に改行がある場合、改行が必要です
    // minItems: 指定された数以上の要素が存在する場合、改行が必要です
    'array-bracket-newline': [`error`, `consistent`],
    // 配列括弧内のスペースを禁止または強制する [recommend: ×, fix: ●]
    // never: 括弧内のスペースを許可しません
    // always: 括弧内に1つ以上のスペースまたは改行が必要
    // singleValue: 単一の要素を含む配列リテラルの括弧内に1つ以上のスペースまたは改行が必要
    // objectsInArrays: 配列リテラルの括弧とオブジェクトリテラルの括弧の間に1つ以上のスペースまたは改行が必要
    // arraysInArrays: 配列リテラルの括弧と配列リテラル要素の括弧の間に1つ以上のスペースまたは改行が必要
    'array-bracket-spacing': [`error`, `never`,
      {singleValue: false, objectsInArrays: false, arraysInArrays: false}],
    // 配列要素の間に改行を強制する [recommend: ×, fix: ●]
    // always: 要素間に改行が必要です
    // never: 要素間に改行が不要です
    // consistent: 要素間で改行を一貫して使用する
    // multiline: 要素内に改行がある場合は改行が必要です
    // minItems: 指定された数以上の要素が存在する場合、改行が必要です
    // ArrayExpression: 配列式の構成
    // ArrayPattern: 構造化割り当ての配列パターンの構成
    // ※ 行がいっぱいになってからの改行が必要
    'array-element-newline': [`off`],
    // ブロックの開始後、終了前にスペースを禁止または強制する [recommend: ×, fix: ●]
    // always: 1つ以上のスペースが必要
    // never: スペースを許可しない
    'block-spacing': [`error`, `never`],
    // ブレーススタイルが必要 [recommend: ×, fix: ●]
    // 1tbs: 真のブレーススタイルを1つ強制します
    // stroustrup: Stroustrupスタイルを適用します
    // allman: allmanスタイルを適用する
    // allowSingleLine: ブロックの開始と終了のブレースを同じ行に置くことができます
    // ※ TypeScript競合
    // 'brace-style': [`error`, `1tbs`, {allowSingleLine: false}],
    'brace-style': [`off`],
    // キャメルケースが必要 [recommend: ×, fix: ×]
    // properties: [always: プロパティに適用します, never: プロパティをチェックしません]
    // ignoreDestructuring: 非構造化識別子をチェックしません
    // ignoreImports: インポートをチェックしません
    // allow: 受け入れるプロパティのリスト
    camelcase: [`error`, {properties: `never`, ignoreDestructuring: false, ignoreImports: false}],
    // コメント最初の文字の大文字の使用を強制または禁止する [recommend: ×, fix: ●]
    // always: 大文字化を必須にする
    // never: 大文字化を禁止する
    // ignorePattern: 無視される単語のリスト
    // ignoreInlineComments: コードの途中のコメントについてレポートしません
    // ignoreConsecutiveComments: コメント直後のコメントについてレポートしません
    // ※ コメントは自由に記載できるべき
    'capitalized-comments': [`off`],
    // 末尾のコンマを必須または禁止 [recommend: ×, fix: ●]
    // never: 末尾のコンマを許可しません
    // always: 末尾にコンマが必要
    // always-multiline: 最後の要素が閉じ括弧と同じ行の場合コンマが必要、別の行の場合コンマは不要
    // only-multiline: 最後の要素が閉じ括弧と同じ行の場合コンマが必要（必須ではない）、別の行の場合コンマは不要
    'comma-dangle': [`error`, `always-multiline`],
    // カンマの周りの間隔を強制します [recommend: ×, fix: ●]
    // before: コンマの前に1つ以上のスペースが必要
    // after: コンマの後に1つ以上のスペースが必要
    // ※ TypeScript競合
    // 'comma-spacing': [`error`, {before: false, after: true}],
    'comma-spacing': [`off`],
    // コンマスタイル [recommend: ×, fix: ●]
    // last: 要素と同じ行にコンマが必要です
    // first: 要素の前と同じ行にコンマが必要です
    // exceptions: 例外のリスト
    // ⇒ ArrayExpression: 配列リテラルのカンマスタイルを無視します
    // ⇒ ArrayPattern: 解体の配列パターンでコンマスタイルを無視します
    // ⇒ ArrowFunctionExpression: アロー関数式のパラメーターのコンマスタイルを無視します
    // ⇒ CallExpression: 関数呼び出しの引数のカンマスタイルを無視します
    // ⇒ FunctionDeclaration: 関数宣言のパラメーターのコンマスタイルを無視します
    // ⇒ FunctionExpression: 関数式のパラメーターのコンマスタイルを無視します
    // ⇒ ImportDeclaration: インポート宣言の指定子のカンマスタイルを無視します
    // ⇒ ObjectExpression: オブジェクトリテラルのカンマスタイルを無視します
    // ⇒ ObjectPattern: 破壊のオブジェクトパターンでカンマスタイルを無視します
    // ⇒ VariableDeclaration: 変数宣言のコンマスタイルを無視します
    // ⇒ NewExpression: コンストラクタ式のパラメータのカンマスタイルを無視します
    'comma-style': [`error`, `last`],
    // プロパティ内のスペースを禁止または強制する [recommend: ×, fix: ●]
    // never: スペースを許可しません
    // always: 1つ以上のスペースが必要
    // enforceForClassMembers: このルールをクラスメンバーに適用します
    'computed-property-spacing': [`error`, `never`, {enforceForClassMembers: true}],
    // thisをキャプチャする一貫した変数が必要 [recommend: ×, fix: ×]
    // ※ アロー関数の存在により不要
    'consistent-this': [`off`],
    // ファイルの最後で改行を要求または禁止する [recommend: ×, fix: ●]
    // always: ファイルが改行で終わることを強制します
    // never: ファイルが改行で終わらないことを強制します
    'eol-last': [`error`, `always`],
    // 関数名とそれを呼び出す左括弧の間にスペースを要求または禁止する [recommend: ×, fix: ●]
    // never: 関数名と開き括弧の間のスペースを許可しません
    // always: 関数名と開き括弧の間にスペースが必要です
    // allowNewlines: 改行を許可する(alwaysのみ)
    // ※ TypeScript競合
    // 'func-call-spacing': [`error`, `never`],
    'func-call-spacing': [`off`],
    // 関数名が割り当てられている変数またはプロパティの名前と一致する必要があります [recommend: ×, fix: ×]
    // always: 常に一致する
    // never: 常に一致しない
    // considerPropertyDescriptor: 以下を処理を考慮に入れる
    //   [`Object.create` `Object.defineProperty` `Object.defineProperties` `Reflect.definePropert`]
    // includeCommonJSModuleExports: CommonJSのエクスポートを考慮に入れる
    'func-name-matching': [`error`, `always`,
      {considerPropertyDescriptor: true, includeCommonJSModuleExports: true}],
    // 名前付きfunction式を要求または禁止する [recommend: ×, fix: ×]
    // always: 関数式には名前が必要です
    // as-needed: ES6環境で名前を自動的に割り当てることができない場合は、関数式に名前を付ける必要があります
    // never: 名前が必要な再帰関数を除き、名前付き関数式を禁止します
    // generators: ジェネレーターに対して [`always`, `as-needed`, `never`]
    'func-names': [`error`, `never`, {generators: `never`}],
    // function宣言またはfunction式のいずれかの一貫した使用を強制する [recommend: ×, fix: ×]
    // expression: 関数宣言の代わりに関数式を使用する必要があります
    // declaration: 関数式の代わりに関数宣言を使用する必要があります
    // allowArrowFunctions: アロー関数の使用を許可します（declarationのみ）
    'func-style': [`error`, `expression`],
    // 関数呼び出しの引数の間に改行を強制する [recommend: ×, fix: ●]
    // always: 引数間に改行を必要とする
    // never: 引数間の改行を許可しません
    // consistent: 引数間で改行を一貫して使用する
    // ※ 行がいっぱいになってからの改行が必要
    'function-call-argument-newline': [`off`],
    // 関数の括弧内で一貫した改行を強制する [recommend: ×, fix: ●]
    // always: 括弧内に改行が必要です
    // never: 括弧内の改行を禁止します
    // multiline: パラメータ/引数のいずれかに改行がある場合、関数の括弧内に改行が必要です
    // multiline-arguments: multilineのように機能しますが、パラメータ/引数が1つしかない場合は、関数の括弧内で改行できます
    // consistent: 括弧のペアごとに改行を一貫して使用する必要があります
    // minItems: パラメータ/引数の数が指定された数以上の要素が存在する場合、関数の括弧内に改行が必要です
    // ※ 行がいっぱいになってからの改行が必要
    'function-paren-newline': [`off`],
    // 指定された識別子を許可しない [recommend: ×, fix: ×]
    // ※ 必要に応じて追記する
    'id-blacklist': [`off`],
    // 識別子の最小長と最大長を強制する [recommend: ×, fix: ×]
    // min: 最小の長さを強制します
    // max: 最大長を強制します
    // properties: {always: 規則を適用します, never: 規則を無視します}
    // exceptions: 例外とする識別子のリスト
    // ※ 制限値を指定するのは困難
    'id-length': [`off`],
    // 指定した正規表現に一致する識別子が必要です [recommend: ×, fix: ×]
    // properties: 一致するオブジェクトプロパティが必要です
    // onlyDeclarations: var、function、classのみマッチする宣言
    // ignoreDestructuring: 分解された識別子をチェックしません
    // ※ 必要に応じて追記する
    'id-match': [`off`],
    // 暗黙のreturnでアロー関数本体の場所を強制します [recommend: ×, fix: ●]
    // beside: アロー関数本体の前の改行を禁止します
    // below: アロー関数本体の前に改行が必要です
    // ※ 行がいっぱいになってからの改行が必要
    'implicit-arrow-linebreak': [`off`],
    // 一貫したインデントを強制する [recommend: ×, fix: ●]
    // SwitchCase: switchのcaseに適用します
    // VariableDeclarator: varに適用します
    // outerIIFEBody: 即時関数に適用します
    // MemberExpression: 複数行のプロパティチェーンに適用します
    // FunctionDeclaration: {parameters: 関数宣言のパラメーターに適用します, body: 関数宣言の本体に適用します}
    // FunctionExpression: {parameters: 関数式のパラメーターに適用します, body: 関数式の本体に適用します}
    // CallExpression: {arguments: 関数呼び出し式の引数に適用します}
    // ArrayExpression: 配列の要素に適用します
    // ObjectExpression: オブジェクトのプロパティに適用します
    // ImportDeclaration: インポート文に適用します
    // flatTernaryExpressions: ネストされている三項式には必要ありません
    // offsetTernaryExpressions: 三項式の値には必要です ※ 動作不安定
    // ignoredNodes: 指定したノードは無視されます
    // ignoreComments: コメントを前または次の行のノードに揃える必要がない場合に使用できます
    // ※ TypeScript競合
    // indent: [`error`, 2, {
    //   SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1, MemberExpression: 1,
    //   FunctionDeclaration: {parameters: 1, body: 1},
    //   FunctionExpression: {parameters: 1, body: 1},
    //   CallExpression: {arguments: 1}, ArrayExpression: 1,
    //   ObjectExpression: 1,ImportDeclaration: 1,
    //   flatTernaryExpressions: false, ignoreComments: false,
    // }],
    indent: [`off`],
    // JSX属性で二重引用符または単一引用符の一貫した使用を強制する [recommend: ×, fix: ●]
    // prefer-double: 二重引用符の使用を強制します
    // prefer-single: 一重引用符の使用を強制します
    'jsx-quotes': [`error`, `prefer-double`],
    // オブジェクトリテラルのプロパティのキーと値の間に一定の間隔を強制する [recommend: ×, fix: ●]
    // beforeColon: キーとコロンの間に少なくとも1つのスペースが必要です
    // afterColon: コロンと値の間に少なくとも1つのスペースが必要です
    // mode: {strict: コロンの前後に1つのスペースを強制します, minimum: コロンの前後に1つ以上のスペースを適用します}
    // align: {value: 値の水平方向の配置を強制します, colon: コロンと値の両方の水平方向の配置を適用します}
    // singleLine 単一行オブジェクトリテラルの間隔スタイルを指定します
    // multiLine 複数行オブジェクトリテラルの間隔スタイルを指定します
    'key-spacing': [`error`, {beforeColon: false, afterColon: true, mode: `strict`}],
    // キーワードの前後に一定の間隔を強制する [recommend: ×, fix: ●]
    // before: キーワードの前に少なくとも1つのスペースが必要
    // after: キーワードの後に少なくとも1つのスペースが必要
    // overrides: 指定した各キーワードの間隔スタイルを上書きできるようにします
    // ※ TypeScript競合
    // 'keyword-spacing': [`error`, {before: true, after: true}],
    'keyword-spacing': [`off`],
    // 行コメントの位置を強制する [recommend: ×, fix: ×]
    // position: {above: コードの上に配置します, beside: コードの横に配置します}
    // ignorePattern: 無視するコメント文字列パターンのリスト
    // applyDefaultIgnorePatterns: ignorePatternが指定されても、デフォルトの無視パターンが適用されます
    'line-comment-position': [`error`, {position: `above`}],
    // 一貫した改行スタイルを強制する [recommend: ×, fix: ●]
    // unix: LFの使用を強制します
    // windows: CRLFの使用を強制します
    'linebreak-style': [`error`, `unix`],
    // コメントの周りに空の行が必要です [recommend: ×, fix: ●]
    // beforeBlockComment: ブロックコメントの前に空行が必要です
    // afterBlockComment: ブロックコメントの後に空行が必要です
    // beforeLineComment: 行コメントの前に空行が必要です
    // afterLineComment: 行コメントの後に空行が必要です
    // allowBlockStart: ブロックの先頭にコメントを表示できるようにします
    // allowBlockEnd: ブロックの最後にコメントを表示できるようにします
    // allowClassStart: クラスの開始時にコメントを表示できます
    // allowClassEnd: クラスの最後にコメントを表示できます
    // allowArrayStart: 配列リテラルの先頭にコメントを表示できるようにします
    // allowArrayEnd: コメントを配列リテラルの最後に表示できるようにします
    // allowObjectStart: オブジェクトリテラルの先頭にコメントを表示できます
    // allowObjectEnd: オブジェクトリテラルの最後にコメントを表示できます
    // ignorePattern: 無視される文字列パターン
    // applyDefaultIgnorePatterns: ignorePatternが指定されても、デフォルトの無視パターンが適用されます
    'lines-around-comment': [`error`, {beforeBlockComment: false, afterBlockComment: false,
      beforeLineComment: false, afterLineComment: false,
      allowBlockStart: true, allowBlockEnd: true, allowClassStart: true, allowClassEnd: true,
      allowArrayStart: true, allowArrayEnd: true, allowObjectStart: true, allowObjectEnd: true}],
    // クラスメンバー間の空の行を必要または禁止する [recommend: ×, fix: ●]
    // always: クラスメンバーの後に空行が必要
    // never: クラスメンバーの後に空行を許可しません
    // exceptAfterSingleLine: 単一行クラスメンバーの後の空行のチェックをスキップする
    'lines-between-class-members': [`error`, `never`, {exceptAfterSingleLine: false}],
    // ブロックをネストできる最大の深さを強制する [recommend: ×, fix: ×]
    // max: ブロックをネストできる最大の深さ
    // ※ 制限値を指定するのは困難
    'max-depth': [`off`],
    // 行の最大長を強制する [recommend: ×, fix: ×]
    // code: 行の最大長を強制します
    // tabWidth: タブ文字の文字幅を指定します
    // comments: コメントの最大行長を強制します
    // ignorePattern: 正規表現に一致する行を無視します
    // ignoreComments: 末尾のコメントと自分の行のコメントをすべて無視します
    // ignoreTrailingComments: 末尾のコメントのみを無視します
    // ignoreUrls: URLを含む行を無視します
    // ignoreStrings: 二重引用符または単一引用符で囲まれた文字列を含む行を無視します
    // ignoreTemplateLiterals: テンプレートリテラルを含む行を無視します
    // ignoreRegExpLiterals: RegExpリテラルを含む行を無視します
    'max-len': [`off`],
    // 'max-len': [`error`, {code: 120, tabWidth: 2, comments: 120,
    //   ignoreComments: false, ignoreTrailingComments: false, ignoreUrls: false,
    //   ignoreStrings: false, ignoreTemplateLiterals: false, ignoreRegExpLiterals: false}],
    // ファイルの最大行数を強制する [recommend: ×, fix: ×]
    // max: ファイルの最大行数を強制します
    // skipBlankLines: 空白のみで構成される行を無視します
    // skipComments: コメントだけを含む行を無視する
    // ※ 制限値を指定するのは困難
    'max-lines': [`off`],
    // 関数の最大行数を強制する [recommend: ×, fix: ×]
    // max: 関数の最大行数を強制します
    // skipBlankLines: 空白のみで構成された行を無視します
    // skipComments: コメントだけを含む行を無視します
    // IIFEs: 即時関数に含まれているすべてのコードを含めます
    // ※ 制限値を指定するのは困難
    'max-lines-per-function': [`off`],
    // コールバックをネストできる最大の深さを強制する [recommend: ×, fix: ×]
    // max: コールバックをネストできる最大の深さを適用します
    // ※ 制限値を指定するのは困難
    'max-nested-callbacks': [`off`],
    // 関数定義でパラメーターの最大数を強制する [recommend: ×, fix: ×]
    // max: 関数定義でパラメーターの最大数を強制します
    // ※ 制限値を指定するのは困難
    'max-params': [`off`],
    // 関数ブロックで許可されるステートメントの最大数を強制する [recommend: ×, fix: ×]
    // max: 関数ブロックで許可されるステートメントの最大数を強制します
    // ignoreTopLevelFunctions: トップレベルの関数を無視します
    // ※ 制限値を指定するのは困難
    'max-statements': [`off`],
    // 行ごとに許可されるステートメントの最大数を強制する [recommend: ×, fix: ×]
    // max: 1行に許可されるステートメントの最大数を適用します
    'max-statements-per-line': [`error`, {max: 1}],
    // 複数行コメントに特定のスタイルを適用する [recommend: ×, fix: ●]
    // starred-block: 行コメントを禁止し、ブロックコメントには各行の前に`*`文字を配置する必要があります
    // bare-block: 行コメントを禁止し、ブロックコメントには各行の前に`*`文字置くことを禁止します
    // separate-lines: 行コメントを必要とし、ブロックコメントを許可しません
    // ※ 複数の行コメントが必要な時もある
    'multiline-comment-style': [`off`],
    // 三項式のオペランド間の改行を強制または禁止します [recommend: ×, fix: ×]
    // always: 改行を適用します
    // always-multiline: 式が複数行にわたる場合、改行を適用します
    // never: 改行を許可しません
    // ※ 行がいっぱいになってからの改行が必要
    'multiline-ternary': [`off`],
    // 大文字で始まるコンストラクタ名が必要 [recommend: ×, fix: ×]
    // newIsCap: すべてのnew演算子を大文字で始まる関数で呼び出す必要があります
    // capIsNew: 大文字で始まるすべての関数をnew演算子で呼び出す必要があります
    // newIsCapExceptions: 指定した小文字で始まる関数名をnew演算子で呼び出すことができます
    // newIsCapExceptionPattern: 正規表現に一致する小文字で始まる関数名をnew演算子で呼び出すことができます
    // capIsNewExceptions: 指定した大文字で始まる関数名をnew演算子なしで呼び出すことができます
    // capIsNewExceptionPattern: 正規表現に一致する大文字で始まる関数名をnew演算子なしで呼び出すことができます
    // properties: オブジェクトのプロパティのチェックを有効にします
    'new-cap': [`error`, {newIsCap: true, capIsNew: true, properties: true}],
    // 引数なしのコンストラクターを呼び出すときに括弧が必要 [recommend: ×, fix: ●]
    // always: 引数なしコンストラクタに括弧を強制します
    // never: 引数なしコンストラクタに括弧を強制しません
    'new-parens': [`error`, `always`],
    // メソッドチェーンの各呼び出しの後に改行を必要とする [recommend: ×, fix: ●]
    // ignoreChainWithDepth: 指定された深さまでのチェーンを許可します
    // ※ 行がいっぱいになってからの改行が必要
    'newline-per-chained-call': [`off`],
    // Arrayコンストラクターを許可しない [recommend: ×, fix: ×]
    // ※ TypeScript競合
    // 'no-array-constructor': [`error`],
    'no-array-constructor': [`off`],
    // ビット演算子を許可しない [recommend: ×, fix: ×]
    // allow：例外として使用されるビット演算子のリストを許可します
    // int32Hint：|0型キャストのパターンでビット単位ORを使用できます
    'no-bitwise': [`error`, {int32Hint: false}],
    // continueステートメントを許可しない [recommend: ×, fix: ×]
    'no-continue': [`error`],
    // コードの後にインラインコメントを許可しない [recommend: ×, fix: ×]
    'no-inline-comments': [`error`],
    // else内、唯一のifを禁止する [recommend: ×, fix: ●]
    'no-lonely-if': [`error`],
    // 異なる演算子の混合を許可しない [recommend: ×, fix: ×]
    // groups: チェックする演算子グループを指定します
    // allowSamePrecedence: 優先順位が等しい場合に混合演算子を許可するかどうかを指定します
    'no-mixed-operators': [`error`, {allowSamePrecedence: true}],
    // インデントにスペースとタブを混在させない [recommend: ●, fix: ×]
    // smart-tabs: スペースを位置合わせに使用する場合、タブとスペースを混在させることができます
    'no-mixed-spaces-and-tabs': [`error`],
    // 連鎖割り当て式の使用を許可しない [recommend: ×, fix: ×]
    'no-multi-assign': [`error`],
    // 複数の空行を許可しない [recommend: ×, fix: ●]
    // max: 連続する最大数の空行を強制します
    // maxEOF: ファイルの終わりに連続する最大数の空行を強制します
    // maxBOF: ファイルの先頭に最大数の連続した空行を強制します
    'no-multiple-empty-lines': [`error`, {max: 1, maxBOF: 0, maxEOF: 0}],
    // 否定された条件を許可しない [recommend: ×, fix: ×]
    // ※ 処理の順番を制御したい場合がある
    'no-negated-condition': [`off`],
    // ネストされた三項式を許可しない [recommend: ×, fix: ×]
    'no-nested-ternary': [`error`],
    // Objectコンストラクターを許可しない [recommend: ×, fix: ×]
    'no-new-object': [`error`],
    // 単項演算子++と--を許可しない [recommend: ×, fix: ×]
    // allowForLoopAfterthoughts: forの最終式での使用を許可します
    // ※ 一部使用可能というのも中途半端
    'no-plusplus': [`off`],
    // 指定された構文を許可しない [recommend: ×, fix: ×]
    // ※ 必要に応じて追記する
    'no-restricted-syntax': [`off`],
    // すべてのタブを許可しない [recommend: ×, fix: ×]
    // allowIndentationTabs: インデントに使用されるタブをレポートしません
    'no-tabs': [`error`, {allowIndentationTabs: false}],
    // 三項演算子を許可しない [recommend: ×, fix: ×]
    // ※ JSでは三項演算子を有効に使用するべき
    'no-ternary': [`off`],
    // 行末の末尾の空白を禁止します [recommend: ×, fix: ●]
    // skipBlankLines: 空行の末尾の空白を許可します
    // ignoreComments: コメントの末尾の空白を許可する
    'no-trailing-spaces': [`error`, {skipBlankLines: false, ignoreComments: false}],
    // 識別子のアンダースコアを禁止する [recommend: ×, fix: ×]
    // allow: 指定した識別子にアンダースコアを付けることができます
    // allowAfterThis: thisオブジェクトのメンバーにアンダースコアを許可します
    // allowAfterSuper: superオブジェクトのメンバーにアンダースコアを許可します
    // allowAfterThisConstructor: this.constructorオブジェクトのメンバーにアンダースコアを許可します
    // enforceInMethodNames: メソッド名にアンダースコアを許可しません
    'no-underscore-dangle': [`error`, {allowAfterThis: false, allowAfterSuper: false,
      allowAfterThisConstructor: false, enforceInMethodNames: true}],
    // より単純な代替が存在する場合、三項演算子を許可しない [recommend: ×, fix: ●]
    // defaultAssignment: 三項演算子をデフォルトの割り当てパターンとして許可します
    'no-unneeded-ternary': [`error`, {defaultAssignment: false}],
    // プロパティの前の空白を許可しない [recommend: ×, fix: ●]
    'no-whitespace-before-property': [`error`],
    // 単一行ステートメントの場所を強制する [recommend: ×, fix: ●]
    // beside: 単一行ステートメントの前の改行を禁止します
    // below: 単一行ステートメントの前に改行が必要です
    // any: 単一行ステートメントの位置を強制しません
    // overrides: デフォルトをオーバーライドする特定のステートメントを指定できます
    'nonblock-statement-body-position': [`error`, `beside`],
    // 中括弧内で一貫した改行を強制する [recommend: ×, fix: ●]
    // always: 中括弧の中に改行が必要
    // never: 中括弧の中に改行を許可しません
    // multiline: プロパティ内またはプロパティ間に改行がある場合は、改行が必要です
    // minProperties: プロパティの数が指定された整数以上の場合は、改行が必要です
    // consistent: 中括弧が両方とも、またはどちらもない場合に改行を直接囲む必要があります
    // ObjectExpression: オブジェクトリテラルの構成
    // ObjectPattern: 解体割り当てのオブジェクトパターンの構成
    // ImportDeclaration: 名前付きインポートの構成
    // ExportDeclaration: 名前付きエクスポートの構成
    'object-curly-newline': [`error`, {consistent: true}],
    // 中括弧の内側に一定の間隔を強制する [recommend: ×, fix: ●]
    // never: 中括弧の内側のスペースを許可しません
    // always: 中括弧の内側にスペースが必要です
    // arraysInObjects: 配列要素で開始または終了するオブジェクトの中括弧の内側にスペースが必要です
    // objectsInObjects: オブジェクト要素で開始または終了するオブジェクトの中括弧の内側にスペースが必要です
    'object-curly-spacing': [`error`, `never`, {arraysInObjects: false, objectsInObjects: false}],
    // オブジェクトプロパティを個別の行に配置することを強制する [recommend: ×, fix: ●]
    // allowAllPropertiesOnSameLine: すべてのプロパティが同一行の場合は許可する
    // ※ 行がいっぱいになってからの改行が必要
    'object-property-newline': [`off`],
    // 変数宣言を一緒または別々にするように強制します [recommend: ×, fix: ●]
    // always: スコープごとに1つの変数宣言が必要
    // never: スコープごとに複数の変数宣言が必要
    // consecutive: スコープごとに複数の変数宣言を許可しますが、連続する変数宣言は結合する必要があります
    // var: var宣言に個別設定 [`always`, `never`, `consecutive`]
    // let: let宣言に個別設定 [`always`, `never`, `consecutive`]
    // const: const宣言に個別設定 [`always`, `never`, `consecutive`]
    // separateRequires: requires宣言とは別にすることを強制する ※ 動作不安定
    // initialized: 初期化された変数に個別設定 [`always`, `never`, `consecutive`]
    // uninitialized: 初期化されていない変数に個別設定 [`always`, `never`, `consecutive`]
    'one-var': [`error`, `never`],
    // 変数宣言の周りの改行を要求または禁止する [recommend: ×, fix: ●]
    // initializations: 変数の初期化を改行します
    // always: 変数宣言を改行する
    // ※ 行がいっぱいになってからの改行が必要（`one-var`との競合も注意）
    'one-var-declaration-per-line': [`off`],
    // 代入演算子の省略形を要求または禁止する [recommend: ×, fix: ●]
    // always: 代入演算子の省略表現が必要です
    // never: 代入演算子の省略表現を許可しません
    'operator-assignment': [`error`, `always`],
    // 演算子に一貫した改行スタイルを適用する [recommend: ×, fix: ●]
    // after: オペレータの後に改行を配置する必要があります
    // before: オペレータの前に改行を入れる必要があります
    // none: オペレーターのどちら側でも改行を許可しません
    // overrides: 指定した演算子のグローバル設定を上書きします
    'operator-linebreak': [`error`, `after`],
    // ブロック内のパディングを要求または禁止する [recommend: ×, fix: ●]
    // always: ブロックとクラスの最初と最後に空の行が必要です
    // never: ブロックとクラスの最初と最後に空行を許可しません
    // blocks: ブロック内のパディングを要求または禁止する
    // classes: クラス内のパディングを要求または禁止する
    // switches: switch内のパディングを要求または禁止する
    // allowSingleLineBlocks: 単一行ブロックを許可
    'padded-blocks': [`error`, `never`],
    // ステートメント間の空白行を必須または禁止する [recommend: ×, fix: ●]
    // any: ステートメントのペアを無視するだけです
    // never: 空白行を許可しません
    // always: 1つ以上の空白行が必要です
    // ※ 構文の種類から区切りを判断するのは難しい
    'padding-line-between-statements': [`off`],
    // **演算子を優先してMath.powを使用することを許可しない [recommend: ×, fix: ●]
    'prefer-exponentiation-operator': [`error`],
    // Object.assignの第一引数がオブジェクトリテラルの場合、
    // 代わりにオブジェクトスプレッドを使用する [recommend: ×, fix: ●]
    'prefer-object-spread': [`error`],
    // オブジェクトリテラルのプロパティを引用符で囲む必要がある [recommend: ×, fix: ●]
    // always: すべてのプロパティを引用符で囲む必要があります
    // as-needed: 必要ではないプロパティを引用符で囲みません
    // consistent: 一貫した引用スタイルを適用します
    // consistent-as-needed: 引用符が必要な場合はすべて引用符で囲み、それ以外の場合は囲みません
    // keywords: 言語キーワードを囲む引用符が必要です
    // unnecessary: 必要ではないプロパティを囲む引用符を許可しません
    // numbers: 数字を囲む引用符が必要です
    'quote-props': [`error`, `as-needed`, {keywords: false, unnecessary: true, numbers: true}],
    // 二重引用符、単一引用符、バッククォートの一貫した使用を強制する [recommend: ×, fix: ●]
    // double: 可能な限り二重引用符を使用する必要があります
    // single: 可能な限り単一引用符を使用する必要があります
    // backtick: 可能な限りバッククォートを使用する必要があります
    // avoidEscape: エスケープの為にその引用符が含まれている限り、それ以外の引用符を使用できます
    // allowTemplateLiterals: 文字列でバッククォートを使用できるようにします
    // ※ TypeScript競合
    // quotes: [`error`, `backtick`, {avoidEscape: false, allowTemplateLiterals: true}],
    quotes: [`off`],
    // セミコロンを要求または禁止する [recommend: ×, fix: ●]
    // always: 文の最後にセミコロンが必要です
    // never: 文の最後にセミコロンを禁止します
    // omitLastInOneLineBlock: ブレースが同じ行にあるブロックの最後のセミコロンを無視します
    // beforeStatementContinuationChars: ※ 動作不安定
    // ⇒ any: 次の行が開始が[`[`, `(`, `/`, `+`, `-`]の場合、セミコロンを無視する
    // ⇒ always: 次の行が開始が[`[`, `(`, `/`, `+`, `-`]の場合、セミコロンを必要とする
    // ⇒ never: 次の行が開始が[`[`, `(`, `/`, `+`, `-`]の場合、セミコロンを禁止する
    // ※ TypeScript競合
    // semi: [`error`, `always`, {omitLastInOneLineBlock: false}],
    semi: [`off`],
    // セミコロンの前後にスペースを強制する [recommend: ×, fix: ●]
    // before: セミコロンの前にスペースが適用されまず
    // after: セミコロンの後にスペースが適用されます
    'semi-spacing': [`error`, {before: false, after: true}],
    // セミコロンの位置を強制する [recommend: ×, fix: ●]
    // last: セミコロンが文の最後にあることを強制します
    // first: セミコロンが文の先頭にあることを強制します
    'semi-style': [`error`, `last`],
    // オブジェクトキーをソートする必要があります [recommend: ×, fix: ×]
    // asc: プロパティを昇順に強制します
    // desc: プロパティを降順に強制します
    // caseSensitive: 大文字と小文字を区別する順序でプロパティを強制します
    // minKeys: エラー出力に必要なオブジェクトキーの最小数を指定します
    // natural: プロパティが自然な順序になるように強制します
    // ※ 順番はアルファベット順とは限らない（表示順、重要度順など）
    'sort-keys': [`off`],
    // 変数の並べ替え [recommend: ×, fix: ●]
    // ignoreCase: 変数の順序の大文字と小文字の区別を無視します
    // ※ 順番はアルファベット順とは限らない（表示順、重要度順など）
    'sort-vars': [`off`],
    // ブロック前のスペースを必要または禁止する [recommend: ×, fix: ●]
    // always: ブロックには少なくとも1つの先行スペースが必要です
    // never: ブロックに先行スペースがあってはなりません
    // functions: ファンクションブロック
    // keywords: キーワードブロック
    // classes: クラスブロック
    'space-before-blocks': [`error`, `always`],
    // 関数の括弧の前にスペースを必要とする、または許可しない [recommend: ×, fix: ●]
    // always: 括弧の前にスペースが必要です
    // never: 括弧の前にスペースを許可しない
    // anonymous: 無名関数式 [`always`, `never`, `ignore`]
    // named: 名前付き関数式 [`always`, `never`, `ignore`]
    // asyncArrow: 非同期アロー関数式 [`always`, `never`, `ignore`]
    // ※ TypeScript競合
    // 'space-before-function-paren': [`error`, `never`],
    'space-before-function-paren': [`off`],
    // 括弧内のスペースを許可または強制しない [recommend: ×, fix: ●]
    // never: 括弧の内側にスペースを禁止します
    // always: 括弧の内側にスペースを強制します
    // exceptions: 空の括弧の例外
    'space-in-parens': [`error`, `never`],
    // 中置演算子の周りにスペースが必要 [recommend: ×, fix: ●]
    // int32Hint: a|0スペースなしで書き込みを許可します
    'space-infix-ops': [`error`, {int32Hint: false}],
    // 単項演算子の前後のスペースを必須または禁止する [recommend: ×, fix: ●]
    // words: new、delete、typeof、void、yieldのような単項ワードに適用されます
    // nonwords: -、+、--、++、!、!!のような単項演算子に適用されます
    // overrides: 各演算子、単語または非単語の間隔の上書き使用を指定します
    'space-unary-ops': [`error`, {words: true, nonwords: false}],
    // コメントを開始する空白を要求または禁止します [recommend: ×, fix: ●]
    // always: コメントの後続に1つ以上の空白が必要です
    // never: コメントの後続に空白を許可しません
    // exceptions: 例外と見なす文字列パターンのリスト（コメント文字列のどこでも）
    // markers: 例外と見なす文字列パターンのリスト（コメント文字列の先頭のみ）
    // line: 行コメント
    // block: ブロックコメント
    // balanced: `/*`の後続と`*/`の先行で制御する空白のバランス（blockのみ）
    'spaced-comment': [`error`, `always`, {block: {balanced: true}}],
    // switchステートメントのコロンの周りに間隔を強制する [recommend: ×, fix: ●]
    // before: コロンの前に1つ以上のスペースが必要です
    // after: コロンの後に1つ以上のスペースが必要です
    'switch-colon-spacing': [`error`, {before: false, after: true}],
    // テンプレートタグとそのリテラルの間隔を必須または禁止する [recommend: ×, fix: ●]
    // never: タグ関数とそのテンプレートリテラルの間のスペースを許可しません
    // always: タグ関数とそのテンプレートリテラルの間に1つ以上のスペースが必要です
    'template-tag-spacing': [`error`, `never`],
    // Unicode Byte Order Mark（BOM）を要求または禁止する [recommend: ×, fix: ●]
    // always: ファイルはUnicode BOMで始まる必要があります
    // never: ファイルはUnicode BOMで始まってはいけません
    'unicode-bom': [`error`, `never`],
    // 正規表現リテラルのラップが必要 [recommend: ×, fix: ●]
    'wrap-regex': [`error`],

    /**
     * ECMAScript6
     * ES2015とも呼ばれるES6に関連するルール
     */
    // アロー関数本体にブレースが必要 [recommend: ×, fix: ●]
    // always: 関数本体を中括弧で囲む
    // as-needed: 省略可能なブレースを強制しません
    // never: 関数本体を中括弧で囲まない
    // requireReturnForObjectLiteral: オブジェクトリテラルの場合、明示的な戻りが必要（as-neededのみ）
    'arrow-body-style': [`error`, `as-needed`, {requireReturnForObjectLiteral: false}],
    // アロー関数の引数に括弧を必要とする [recommend: ×, fix: ●]
    // always: すべての場合において、引数の前後に括弧が必要です
    // as-needed: 省略可能なブレースを強制しません
    // requireForBlockBody: 関数本体が中括弧ブロック内にある場合に括弧を必要とする（as-neededのみ）
    'arrow-parens': [`error`, `always`],
    // アロー関数の矢印の前後にスペースが必要 [recommend: ×, fix: ●]
    // before: 矢印の前に１つ以上のスペースが必要
    // after: 矢印の後に１つ以上のスペースが必要
    'arrow-spacing': [`error`, {before: true, after: true}],
    // super()コンストラクターでの呼び出しを確認する [recommend: ●, fix: ×]
    'constructor-super': [`error`],
    // ジェネレーター関数で*の周りに間隔を強制する [recommend: ×, fix: ●]
    // before: *とfunctionの間にスペースが必要です
    // after: *と関数名（または無名ジェネレーター関数の左括弧）の間にスペースが必要です
    // named: 名前付き関数のオーバーライドを提供します
    // anonymous: 無名関数のオーバーライドを提供します
    // method: クラスメソッドまたはプロパティ関数の省略形のオーバーライドを提供します
    'generator-star-spacing': [`error`, {before: false, after: true,
      named: {before: false, after: true},
      anonymous: {before: false, after: false},
      method: {before: true, after: true}}],
    // クラス宣言の変数の変更を許可しない [recommend: ●, fix: ×]
    'no-class-assign': [`error`],
    // 比較と混同される可能性があるアロー関数を許可しない [recommend: ×, fix: ●]
    // allowParens: ルールを緩和し、括弧を有効な「混乱防止」構文として受け入れます
    'no-confusing-arrow': [`error`, {allowParens: true}],
    // constを使用して宣言された変数の変更を許可しない [recommend: ●, fix: ×]
    'no-const-assign': [`error`],
    // クラスメンバーの重複した名前を許可しない [recommend: ●, fix: ×]
    // ※ TypeScript競合
    // 'no-dupe-class-members': [`error`],
    'no-dupe-class-members': [`off`],
    // 重複するインポートを許可しない [recommend: ×, fix: ×]
    // includeExports: 再エクスポートする場合、インポートを追加し使用せずにエクスポートします
    'no-duplicate-imports': [`error`, {includeExports: false}],
    // Symbolコンストラクターを許可しない [recommend: ●, fix: ×]
    'no-new-symbol': [`error`],
    // エクスポートで指定した名前を許可しない [recommend: ×, fix: ×]
    // restrictedNamedExports: 制限される名前のリスト
    // ※ 必要に応じて追記する
    // ※ version7.0.0以降でサポート
    'no-restricted-exports': [`off`],
    // 特定のインポートを許可しない [recommend: ×, fix: ×]
    // paths: 制限される名前のリスト
    // patterns: 制限される名前パターンのリスト
    // name: モジュール名
    // importNames: インポート名
    // message: カスタムメッセージ
    // ※ 必要に応じて追記する
    'no-restricted-imports': [`off`],
    // コンストラクタでsuperを呼び出す前にthisの使用を禁止します [recommend: ●, fix: ×]
    'no-this-before-super': [`error`],
    // オブジェクトとクラスで不要な計算済みプロパティキーを許可しない [recommend: ×, fix: ●]
    // enforceForClassMembers: クラスメンバーにも適用するように設定します
    'no-useless-computed-key': [`error`, {enforceForClassMembers: true}],
    // 不要なコンストラクターを許可しない [recommend: ×, fix: ×]
    // ※ TypeScript競合
    // 'no-useless-constructor': [`error`],
    'no-useless-constructor': [`off`],
    // インポート、エクスポート、分解された割り当ての同じ名前への名前変更を許可しない [recommend: ×, fix: ●]
    // ignoreImport: インポートをチェックしません
    // ignoreExport: エクスポートをチェックしません
    // ignoreDestructuring: 破壊的な割り当てをチェックしません
    'no-useless-rename': [`error`,
      {ignoreImport: false, ignoreExport: false, ignoreDestructuring: false}],
    // varの代わりにletかconstを必要とする [recommend: ×, fix: ●]
    'no-var': [`error`],
    // オブジェクトリテラルの省略表現が必要 [recommend: ×, fix: ●]
    // always: 省略形が使用されるようにします
    // methods: メソッドの省略表現が使用されるようにします
    // properties: プロパティの省略表現が使用されるようにします
    // never: 省略表現が使用されないようにします
    // consistent: 一貫した規則に従う
    // consistent-as-needed: 一貫した規則に従うが、可能な限り省略形を使用します
    // avoidQuotes: キーが文字列である場合は、長い形式を優先します
    // ignoreConstructors: コンストラクターの長い形式を許可します
    // avoidExplicitReturnArrows: 明示的なリターンのアロー関数よりもメソッドを優先します
    'object-shorthand': [`error`, `always`,
      {avoidQuotes: true, ignoreConstructors: false, avoidExplicitReturnArrows: false}],
    // コールバックにアロー関数を使用する必要があります [recommend: ×, fix: ●]
    // allowNamedFunctions: 名前付き関数をコールバックまたは関数引数として使用することを許可します
    // allowUnboundThis: thisを含む関数式をコールバックとして使用できるようにします
    'prefer-arrow-callback': [`error`, {allowNamedFunctions: false, allowUnboundThis: true}],
    // constの使用を提案 [recommend: ×, fix: ●]
    // destructuring: {any: 構造化中いづれかの変数がconstの場合, all: 構造化中すべての変数がconstの場合}
    // ignoreReadBeforeAssign: 宣言と最初の割り当ての間で読み取られる変数を無視します
    'prefer-const': [`error`, {destructuring: `all`, ignoreReadBeforeAssign: false}],
    // 配列とオブジェクトからの分解を優先する [recommend: ×, fix: ●]
    // array: 配列に適用する
    // object: オブジェクトに適用する
    // VariableDeclarator: 変数宣言に適用する
    // AssignmentExpression: 割り当て式に適用する
    // enforceForRenamedProperties: 名前の変更された変数に構造化を適用する
    // ※ 構造化では複数の変数を同時に宣言できてしまうので、他のルールと矛盾してしまう
    'prefer-destructuring': [`off`],
    // 2進数、8進数、16進数のリテラルを支持する [recommend: ×, fix: ●]
    'prefer-numeric-literals': [`error`],
    // argumentsの代わりにスプレッドの使用を提案する [recommend: ×, fix: ×]
    'prefer-rest-params': [`error`],
    // applyの代わりにスプレッドの使用を提案する [recommend: ×, fix: ×]
    'prefer-spread': [`error`],
    // 文字列連結の代わりにテンプレートリテラルの使用を提案します [recommend: ×, fix: ●]
    'prefer-template': [`error`],
    // yieldを持たないジェネレーター関数を禁止する [recommend: ●, fix: ×]
    'require-yield': [`error`],
    // スプレッド演算子とその式の間隔を強制する [recommend: ×, fix: ●]
    // always: スプレッド演算子とその式の間に空白が必要です
    // never: スプレッド演算子とその式の間の空白は許可されません
    'rest-spread-spacing': [`error`, `never`],
    // インポートの並べ替え [recommend: ×, fix: ●]
    // ignoreCase: インポートしたローカル名の大文字と小文字の区別を無視します
    // ignoreDeclarationSort: インポートしたローカル名のソートを無視します
    // ignoreMemberSort: multipleメンバーの並べ替えを無視します
    // memberSyntaxSortOrder: 以下の4つを並べて順にソートします
    // ⇒ none: バインディングなしでモジュールをインポートします
    // ⇒ all: バインディングによって提供されるすべてのメンバーをインポートします
    // ⇒ multiple: 複数のメンバーをインポートします
    // ⇒ single: 単一のメンバーをインポートします
    // ※ 順番はアルファベット順とは限らない（表示順、重要度順など）
    'sort-imports': [`off`],
    // symbolに説明が必要 [recommend: ×, fix: ×]
    'symbol-description': [`error`],
    // テンプレート文字列のスペースの使用を強制する [recommend: ×, fix: ●]
    // always: 中括弧の内側に1つ以上のスペースが必要です
    // never: 中括弧の内側にスペースを許可しません
    'template-curly-spacing': [`error`, `never`],
    // yieldで*の周りに間隔を強制する [recommend: ×, fix: ●]
    // before: yieldと*の間隔を強制します
    // after: *と引数の間隔を強制します
    'yield-star-spacing': [`error`, {before: false, after: true}],
  },
  overrides: [{
    files: [`*.ts`, `*.vue`],
    plugins: [`@typescript-eslint`, `vue`],
    parser: `vue-eslint-parser`,
    parserOptions: {
      parser: `@typescript-eslint/parser`,
      ecmaVersion: 2018,
      sourceType: `module`,
    },
    rules: {
      /**
      * Supported Rules
      */
      // メンバーのオーバーロードが連続している必要があります [recommend: ●, fix: ×, require: ×]
      '@typescript-eslint/adjacent-overload-signatures': [`error`],
      // 配列にはT[]またはArray<T>を使用する必要があります [recommend: ×, fix: ●, require: ×]
      // default: 書き込み可能に設定する配列タイプ
      // readonly: 読み取り専用に設定する配列タイプ
      // ⇒ array: 常にT[]を使用してください
      // ⇒ generic: 常にArray<T>を使用してください
      // ⇒ array-simple: 単純な型にはT[]を使用し、その他にはArray<T>を使用します
      '@typescript-eslint/array-type': [`error`, {default: `array`, readonly: `array`}],
      // Thenableではない値のawaitを禁止します [recommend: ●, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/await-thenable': [`off`],
      // @ts-<directive>コメントの使用を禁止 [recommend: ×, fix: ×, require: ×]
      // ts-expect-error: @ts-expect-errorを禁止する
      // ts-ignore: @ts-ignoreを禁止する
      // ts-nocheck: @ts-nocheckを禁止する
      // ts-check: @ts-checkを禁止する
      '@typescript-eslint/ban-ts-comment': [`error`,
        {'ts-expect-error': true, 'ts-ignore': true, 'ts-nocheck': true, 'ts-check': true}],
      // 特定の型の使用を禁止します [recommend: ●, fix: ●, require: ×]
      // types: キーに禁止するタイプ、値にエラーメッセージを設定する
      // ⇒ message: 表示するメッセージ
      // ⇒ fixWith: 置換する文字列
      // extendDefaults: デフォルトの設定を拡張できます
      '@typescript-eslint/ban-types': [`error`, {types: {Function: false, object: false}}],
      // クラスのリテラルが一貫したスタイルで公開されるようにします [recommend: ×, fix: ●, require: ×]
      // fields: readonlyを持つフィールドとして定義する必要があります
      // getters: ゲッターとして定義する必要があります
      '@typescript-eslint/class-literal-property-style': [`error`, `fields`],
      // 型アサーションの一貫した使用を強制します [recommend: ●, fix: ×, require: ×]
      // assertionStyle: {`as`: asを使用する, `angle-bracket`: <>を使用する, `never`: アサーションしない}
      // objectLiteralTypeAssertions: オブジェクトリテラルに対する型アサーション
      // {`allow`: 許可する, `allow-as-parameter`: パラメーターに対して許可する, `never`: 許可しない}
      '@typescript-eslint/consistent-type-assertions': [`off`],
      // interfaceまたはtypeの一貫した型定義 [recommend: ×, fix: ●, require: ×]
      // interface: interfaceの使用を強制します
      // type: typeの使用を強制します
      '@typescript-eslint/consistent-type-definitions': [`error`, `type`],
      // 関数とクラスメソッドで明示的な戻り値の型を要求する [recommend: ●, fix: ×, require: ×]
      // allowExpressions: コールバックの場合は許可する
      // allowTypedFunctionExpressions: 型注釈されている場合は許可する
      // allowHigherOrderFunctions: returnが関数の場合は許可する
      // allowDirectConstAssertionInArrowFunctions: `as const`値を返す矢印関数はチェックされません
      // allowConciseArrowFunctionExpressionsStartingWithVoid: returnがvoidで開始する場合は許可する
      '@typescript-eslint/explicit-function-return-type': [`error`, {
        allowExpressions: true, allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true, allowDirectConstAssertionInArrowFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      }],
      // クラスのプロパティとメソッドに明示的なアクセス修飾子を要求する [recommend: ×, fix: ●, require: ×]
      // accessibility: {`explicit`: アクセス修飾子が必要, `no-public`: publicは不要, `off`: チェックしない}
      // ignoredMethodNames: 無視するメソッド名のリスト
      // overrides: 指定したタイプの設定を上書きします
      // [`accessors`, `constructors`, `methods`, `properties`, `parameterProperties`]
      '@typescript-eslint/explicit-member-accessibility': [`error`, {accessibility: `explicit`}],
      // エクスポートされた関数に明示的な戻り値と引数の型を要求する [recommend: ×, fix: ×, require: ×]
      // allowTypedFunctionExpressions: 関数式の変数に型注釈を付けることもできます
      // allowHigherOrderFunctions: 関数を返す関数は、戻り値の注釈を必要としません
      // allowDirectConstAssertionInArrowFunctions: `as const`を返すアロー関数は、戻り値の注釈を必要としません
      // allowedNames: 許可する関数名のリスト
      // shouldTrackReferences: エクスポートされた変数への参照と直接エクスポートを追跡します
      // ※ エクスポートの有無は判断基準にならない
      '@typescript-eslint/explicit-module-boundary-types': [`off`],
      // interfaceとtypeリテラルにメンバー区切り文字スタイルを要求する [recommend: ●, fix: ●, require: ×]
      // singleline: 単一ライン
      // multiline: 複数ライン
      // delimiter: {comma: 区切り文字コンマ, semi: 区切り文字セミコロン, none: 区切り文字なし}
      // requireLast: 最後のメンバーに区切り文字を含めるかどうかを決定します
      // overrides: 固有のオプションを指定できます
      // interface: インターフェース
      // typeLiteral: タイプ
      '@typescript-eslint/member-delimiter-style': [`error`, {
        singleline: {delimiter: `semi`, requireLast: true},
        multiline: {delimiter: `semi`, requireLast: true},
      }],
      // 一貫したメンバー宣言順序が必要 [recommend: ×, fix: ×, require: ×]
      // memberTypes: グループを並べ替え、メンバーの順序を強制しない
      // ⇒ never: 書かれた通りの順
      // order: メンバーを並べ替え、グループの順序を強制しない
      // ⇒ alphabetically: グループ内のすべてのメンバーをアルファベット順に並べ替えることができます
      // ⇒ as-written: 書かれた通りの順
      // ※ 順番はアルファベット順とは限らない（表示順、重要度順など）
      '@typescript-eslint/member-ordering': [`off`],
      // 特定のメソッドシグネチャ構文の使用を強制します [recommend: ×, fix: ●, require: ×]
      // property: 関数のプロパティシグネチャの使用を強制します
      // method: 関数のメソッドシグネチャの使用を強制します
      '@typescript-eslint/method-signature-style': [`error`, `property`],
      // コードベース全体のすべてに命名規則を適用します [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/naming-convention': [`off`],
      // 文字列化されたときに有用な情報を提供するオブジェクトでのみtoStringが呼び出される必要があります [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/no-base-to-string': [`off`],
      // 動的に計算されたキーで削除演算子を許可しない [recommend: ×, fix: ●, require: ×]
      // ※ 動的な削除を必要とする時がある
      '@typescript-eslint/no-dynamic-delete': [`off`],
      // 空のインターフェース宣言を禁止する [recommend: ●, fix: ●, require: ×]
      // allowSingleExtends: メンバーを追加せずに単一のインターフェースを拡張することを許可します
      '@typescript-eslint/no-empty-interface': [`error`, {allowSingleExtends: false}],
      // anyの使用を許可しない [recommend: ●, fix: ●, require: ×]
      // fixToUnknown: `any`が`unknown`に自動変換されます
      // ignoreRestArgs: レスト演算子からの配列を許可します
      // ※ any型が必要な時がある
      '@typescript-eslint/no-explicit-any': [`off`],
      // 余分なnon-nullアサーションを許可しない [recommend: ×, fix: ●, require: ×]
      '@typescript-eslint/no-extra-non-null-assertion': [`error`],
      // 名前空間としてのクラスの使用を禁止します [recommend: ×, fix: ×, require: ×]
      // allowConstructorOnly: コンストラクタのみの場合を許可する
      // allowEmpty: ボディが空の場合を許可する
      // allowStaticOnly: 静的メンバーのみの場合を許可する
      // allowWithDecorator: デコレータがある場合を許可する
      '@typescript-eslint/no-extraneous-class': [`error`, {
        allowConstructorOnly: false, allowEmpty: false,
        allowStaticOnly: true, allowWithDecorator: false,
      }],
      // Promiseに似た値を適切に処理する必要があります [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/no-floating-promises': [`off`],
      // for-inループで配列の反復を禁止する [recommend: ●, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/no-for-in-array': [`off`],
      // evalのようなメソッドの使用を禁止する [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/no-implied-eval': [`off`],
      // 簡単に推測できる明示的な型は、冗長性を追加する可能性があります [recommend: ●, fix: ●, require: ×]
      // ignoreParameters: パラメータは無視する
      // ignoreProperties: プロパティは無視する
      '@typescript-eslint/no-inferrable-types': [`error`,
        {ignoreParameters: true, ignoreProperties: true}],
      // newとコンストラクタの有効な定義を強制する [recommend: ●, fix: ×, require: ×]
      '@typescript-eslint/no-misused-new': [`error`],
      // プロミスを処理するように設計されていない場所でプロミスを使用しないでください [recommend: ●, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/no-misused-promises': [`off`],
      // カスタムTypeScriptモジュールと名前空間の使用を禁止する [recommend: ●, fix: ×, require: ×]
      // allowDeclarations: カスタムTypeScriptモジュールおよび名前空間を宣言を許可します
      // allowDefinitionFiles: カスタムTypeScriptモジュールと定義ファイル内の名前空間を宣言を許可します
      '@typescript-eslint/no-namespace': [`error`,
        {allowDeclarations: true, allowDefinitionFiles: true}],
      // オプションのチェーン式の後にnon-nullアサーションを使用することを禁止します [recommend: ×, fix: ×, require: ×]
      '@typescript-eslint/no-non-null-asserted-optional-chain': [`error`],
      // non-nullアサーションを禁止します [recommend: ●, fix: ×, require: ×]
      // ※ 必ず存在するなど必要な時がある
      '@typescript-eslint/no-non-null-assertion': [`off`],
      // クラスコンストラクターでのパラメータープロパティの使用を禁止する [recommend: ×, fix: ×, require: ×]
      // allows: 許可するアイテムのリスト [`readonly`, `private`, `protected`, `public`]
      // [`private readonly`, `protected readonly`, `public readonly`]
      '@typescript-eslint/no-parameter-properties': [`off`],
      // requireの呼び出しを許可しません [recommend: ×, fix: ×, require: ×]
      '@typescript-eslint/no-require-imports': [`error`],
      // thisを変数に割り当てることを禁止します [recommend: ●, fix: ×, require: ×]
      // allowDestructuring: `const {props、state} = this`;を許可します
      // allowedNames: 許可する変数名のリスト
      '@typescript-eslint/no-this-alias': [`error`, {allowDestructuring: false}],
      // 例外としてのリテラルのスローを禁止する [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/no-throw-literal': [`off`],
      // typeの使用を禁止する [recommend: ×, fix: ×, require: ×]
      // allowAliases: エイリアスでの使用を許可します
      // allowCallbacks: コールバックでの使用を許可します
      // allowConditionalTypes: 条件付き型での使用を許可します
      // allowConstructors: コンストラクターでの使用を許可します
      // allowLiterals: リテラルオブジェクトでの使用を許可します
      // allowMappedTypes: マッピングツールでの使用を許可します
      // allowTupleTypes: タプルでの使用を許可します
      // ※ 外部の型定義などにtypeが存在する
      '@typescript-eslint/no-type-alias': [`off`],
      // ブールリテラルに対する不必要な等価比較にフラグを立てます [recommend: ×, fix: ●, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': [`off`],
      // タイプが常に真であるか、常に偽である条件文を防止します [recommend: ×, fix: ●, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/no-unnecessary-condition': [`off`],
      // 名前空間修飾子が不要な場合に警告する [recommend: ×, fix: ●, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/no-unnecessary-qualifier': [`off`],
      // 型引数が不要な場合は使用されないことを強制します [recommend: ×, fix: ●, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/no-unnecessary-type-arguments': [`off`],
      // 型アサーションが式の型を変更しない場合に警告します [recommend: ●, fix: ●, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/no-unnecessary-type-assertion': [`off`],
      // 変数およびプロパティへのanyの割り当てを禁止します [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/no-unsafe-assignment': [`off`],
      // 任意の型の値の呼び出しを許可しません [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/no-unsafe-call': [`off`],
      // 型付き変数へのメンバーアクセスを禁止します [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/no-unsafe-member-access': [`off`],
      // 関数からの戻りを禁止します [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/no-unsafe-return': [`off`],
      // 未使用の変数と引数を許可しない [recommend: ×, fix: ×, require: ●]
      // ignoredNamesRegex: 無視する文字列パターン
      // ignoreArgsIfArgsAfterAreUsed: 使用されている引数よりも先行している引数を無視します
      // ※ 動作不安定
      '@typescript-eslint/no-unused-vars-experimental': [`off`],
      // import以外のrequireの使用を禁止します [recommend: ●, fix: ×, require: ×]
      '@typescript-eslint/no-var-requires': [`error`],
      // リテラル型よりもas constの使用を推奨 [recommend: ×, fix: ●, require: ×]
      '@typescript-eslint/prefer-as-const': [`error`],
      // インデックスが配列参照のみに使用される場合、`for`より`for-of`を優先します [recommend: ×, fix: ×, require: ×]
      '@typescript-eslint/prefer-for-of': [`error`],
      // コールシグネチャだけのインターフェースやリテラルタイプは、代わりに関数型を提案します [recommend: ×, fix: ●, require: ×]
      '@typescript-eslint/prefer-function-type': [`error`],
      // indexOfメソッドよりもincludeメソッドを強制する [recommend: ●, fix: ●, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/prefer-includes': [`off`],
      // カスタムTypeScriptモジュールを宣言するには、`module`の代わりに`namespace`を使用する [recommend: ●, fix: ●, require: ×]
      '@typescript-eslint/prefer-namespace-keyword': [`error`],
      // 論理チェーンではなく、ヌルな合体演算子の使用を強制する [recommend: ×, fix: ●, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/prefer-nullish-coalescing': [`off`],
      // 連鎖論理ANDの代わりに、簡潔な連鎖式を使用することを推奨します [recommend: ×, fix: ●, require: ×]
      '@typescript-eslint/prefer-optional-chain': [`error`],
      // プライベートメンバーがコンストラクターの外で変更されていない場合は、読み取り専用としてマークする必要があります [recommend: ×, fix: ●, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/prefer-readonly': [`off`],
      // 入力の偶発的な変更を防ぐために、関数パラメーターを読み取り専用として入力する必要があります [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/prefer-readonly-parameter-types': [`off`],
      // キャストするのではなく、Array＃reduceを呼び出すときに型パラメーターを使用する [recommend: ×, fix: ●, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/prefer-reduce-type-parameter': [`off`],
      // グローバルフラグが指定されていない場合、
      // String＃matchの代わりにRegExp＃execが使用されることを強制します [recommend: ●, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/prefer-regexp-exec': [`off`],
      // サブストリングをチェックする他の同等のメソッドの代わりに、
      // String＃startsWithおよびString＃endsWithの使用を強制します [recommend: ●, fix: ●, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/prefer-string-starts-ends-with': [`off`],
      // @ts-ignoreではなく@ts-expect-errorを使用することを推奨します [recommend: ×, fix: ●, require: ×]
      '@typescript-eslint/prefer-ts-expect-error': [`error`],
      // 非同期としてマークされているPromiseを返す関数またはメソッドが必要です [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/promise-function-async': [`off`],
      // 常にcompareFunctionを提供するには、Array＃sort呼び出しが必要です [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/require-array-sort-compare': [`off`],
      // 2つの変数を追加する場合、オペランドは両方とも数値型または文字列型である必要があります [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/restrict-plus-operands': [`off`],
      // テンプレートリテラル式を文字列型にする [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/restrict-template-expressions': [`off`],
      // ブール式で許可されるタイプを制限します [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/strict-boolean-expressions': [`off`],
      // ユニオンタイプのスイッチでの網羅性チェック [recommend: ×, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/switch-exhaustiveness-check': [`off`],
      // トリプルスラッシュディレクティブの使用は、推奨されていません [recommend: ●, fix: ×, require: ×]
      // path: /// <reference path="hoge" />
      // types: /// <reference types="hoge" />
      // lib: /// <reference lib="hoge" />
      '@typescript-eslint/triple-slash-reference': [`error`,
        {path: `never`, types: `never`, lib: `never`}],
      // タイプアノテーションの周りに一定の間隔が必要です [recommend: ●, fix: ●, require: ×]
      // before: コロンの前にスペースが必要です
      // after: コロンの後にスペースが必要です
      // overrides: コロンを使用した型注釈および矢印を使用した関数型のデフォルトオプションをオーバーライドします
      '@typescript-eslint/type-annotation-spacing': [`error`,
        {before: true, after: true, overrides: {colon: {before: false, after: true}}}],
      // 型注釈が存在する必要があります [recommend: ×, fix: ×, require: ×]
      // arrayDestructuring: 配列の構造化を使用して宣言された変数に型注釈を適用する
      // arrowParameter: 矢印関数のパラメーターに型注釈を適用する
      // memberVariableDeclaration: クラスのメンバー変数に型注釈を適用する
      // objectDestructuring: オブジェクトの構造化を使用して宣言された変数に型注釈を適用する
      // parameter: 関数とメソッドのパラメーターに型注釈を適用する
      // propertyDeclaration: インターフェイスと型のプロパティに型注釈を適用する
      // variableDeclaration: 変数宣言に型注釈を適用する
      // variableDeclarationIgnoreFunction: 関数の変数宣言を無視します
      // ※ '@typescript-eslint/no-inferrable-types'で型注釈を制御しているので不要
      '@typescript-eslint/typedef': [`off`],
      //  [recommend: ●, fix: ×, require: ●]
      // ※ 拡張機能が必要
      '@typescript-eslint/unbound-method': [`off`],
      // 1つに統合できる2つのオーバーロードについて警告します [recommend: ×, fix: ×, require: ×]
      '@typescript-eslint/unified-signatures': [`error`],

      /**
      * Extension Rules
      * ESLint自体が同じ機能を持つルールですが、それはTypeScript構文をサポートしません
      */
      // ブロックに一貫したブレーススタイルを適用する
      // [recommend: ×, fix: ●, require: ×, relation: eslint/brace-style]
      // 1tbs: 真のブレーススタイルを1つ強制します
      // stroustrup: Stroustrupスタイルを適用します
      // allman: allmanスタイルを適用する
      // allowSingleLine: ブロックの開始と終了のブレースを同じ行に置くことができます
      '@typescript-eslint/brace-style': [`error`, `1tbs`, {allowSingleLine: false}],
      // コンマの前後に一定の間隔を強制します
      // [recommend: ×, fix: ●, require: ×, relation: eslint/comma-spacing]
      // before: コンマの前に1つ以上のスペースが必要
      // after: コンマの後に1つ以上のスペースが必要
      '@typescript-eslint/comma-spacing': [`error`, {before: false, after: true}],
      // デフォルトのパラメーターが最後になるように強制する
      // [recommend: ×, fix: ×, require: ×, relation: eslint/default-param-last]
      '@typescript-eslint/default-param-last': [`error`],
      // 可能な限りドット表記を強制する
      // [recommend: ×, fix: ●, require: ●, relation: eslint/dot-notation]
      // allowKeywords: 予約語プロパティのドット表記を許可します
      // allowPattern: パターンに一致するプロパティ名のブラケット表記を許可します
      // allowPrivateClassPropertyAccess: クラスのprivateプロパティへのアクセスを許可する
      // ※ 拡張機能が必要
      '@typescript-eslint/dot-notation': [`off`],
      // 関数識別子とその呼び出しの間の間隔を必須または禁止
      // [recommend: ×, fix: ●, require: ×, relation: eslint/func-call-spacing]
      // never: 関数名と開き括弧の間のスペースを許可しません
      // always: 関数名と開き括弧の間にスペースが必要です
      // allowNewlines: 改行を許可する(alwaysのみ)
      '@typescript-eslint/func-call-spacing': [`error`, `never`],
      // 一貫したインデントを適用する
      // [recommend: ×, fix: ●, require: ×, relation: eslint/indent]
      // SwitchCase: switchのcaseに適用します
      // VariableDeclarator: varに適用します
      // outerIIFEBody: 即時関数に適用します
      // MemberExpression: 複数行のプロパティチェーンに適用します
      // FunctionDeclaration: {parameters: 関数宣言のパラメーターに適用します, body: 関数宣言の本体に適用します}
      // FunctionExpression: {parameters: 関数式のパラメーターに適用します, body: 関数式の本体に適用します}
      // CallExpression: {arguments: 関数呼び出し式の引数に適用します}
      // ArrayExpression: 配列の要素に適用します
      // ObjectExpression: オブジェクトのプロパティに適用します
      // ImportDeclaration: インポート文に適用します
      // flatTernaryExpressions: ネストされている三項式には必要ありません
      // offsetTernaryExpressions: 三項式の値には必要です ※ 動作不安定
      // ignoredNodes: 指定したノードは無視されます
      // ignoreComments: コメントを前または次の行のノードに揃える必要がない場合に使用できます
      '@typescript-eslint/indent': [`error`, 2, {
        SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1, MemberExpression: 1,
        FunctionDeclaration: {parameters: 1, body: 1},
        FunctionExpression: {parameters: 1, body: 1},
        CallExpression: {arguments: 1},
        ArrayExpression: 1, ObjectExpression: 1, ImportDeclaration: 1,
        flatTernaryExpressions: false, ignoreComments: false,
      }],
      // 変数宣言で初期化を要求または禁止する
      // [recommend: ×, fix: ×, require: ×, relation: eslint/init-declarations]
      // always: 宣言時の初期化を強制する
      // never: 宣言時の初期化を禁止する
      // ignoreForLoopInit: forループで宣言の初期化を許可する（`never`時のみ）
      '@typescript-eslint/init-declarations': [`error`, `always`],
      // キーワードの前後に一定の間隔を設ける
      // [recommend: ×, fix: ●, require: ×, relation: eslint/keyword-spacing]
      // before: キーワードの前に少なくとも1つのスペースが必要
      // after: キーワードの後に少なくとも1つのスペースが必要
      // overrides: 指定した各キーワードの間隔スタイルを上書きできるようにします
      '@typescript-eslint/keyword-spacing': [`error`, {before: true, after: true}],
      // クラスメンバー間の空行を必須または禁止する
      // [recommend: ×, fix: ●, require: ×, relation: eslint/lines-between-class-members]
      // always: クラスメンバーの後に空行が必要
      // never: クラスメンバーの後に空行を許可しません
      // exceptAfterSingleLine: 単一行クラスメンバーの後の空行のチェックをスキップする
      // exceptAfterOverload: クラスメンバーのオーバーロード後に空行のチェックをスキップする
      // ※ 動作不安定
      '@typescript-eslint/lines-between-class-members': [`off`],
      // Arrayコンストラクターを許可しない
      // [recommend: ●, fix: ●, require: ×, relation: eslint/no-array-constructor]
      '@typescript-eslint/no-array-constructor': [`error`],
      // 重複するクラスメンバーを許可しない
      // [recommend: ×, fix: ×, require: ×, relation: eslint/no-dupe-class-members]
      '@typescript-eslint/no-dupe-class-members': [`error`],
      // 空の関数を許可しない
      // [recommend: ●, fix: ×, require: ×, relation: eslint/no-empty-function]
      // allow: 空の関数を許可する種類のリスト
      // ⇒ functions: 通常の関数
      // ⇒ arrowFunctions: アロー関数
      // ⇒ generatorFunctions: ジェネレータ関数
      // ⇒ methods: クラスメソッドとオブジェクトリテラルのメソッド
      // ⇒ generatorMethods: クラスメソッドとジェネレーターを使用したオブジェクトリテラルのメソッド
      // ⇒ getters: ゲッター
      // ⇒ setters: セッター
      // ⇒ constructors: クラスコンストラクタ
      // ⇒ asyncFunctions: 非同期関数
      // ⇒ asyncMethods: オブジェクトリテラルの非同期クラスメソッドとメソッド
      '@typescript-eslint/no-empty-function': [`off`],
      // 不要な括弧を許可しない
      // [recommend: ×, fix: ●, require: ×, relation: eslint/no-extra-parens]
      // ※ 複雑な式を括弧で囲むと意図が明確になり解読しやすくなる(no-mixed-operators)
      '@typescript-eslint/no-extra-parens': [`off`],
      // 不要なセミコロンを許可しない
      // [recommend: ×, fix: ●, require: ×, relation: eslint/no-extra-semi]
      '@typescript-eslint/no-extra-semi': [`error`],
      // マジックナンバーを許可しない
      // [recommend: ×, fix: ×, require: ×, relation: eslint/no-magic-numbers]
      // ignore: 許可する数値の配列
      // ignoreArrayIndexes: 配列インデックスの数値を許可する
      // enforceConst: 数値の変数宣言でconstをチェックする
      // detectObjects: オブジェクトのプロパティをチェックする
      // ignoreEnums: 列挙型が問題ないと見なされるかどうかを指定する
      // ignoreNumericLiteralTypes: 数値リテラルタイプで使用される数値が問題ないと見なされるかどうかを指定する
      // ignoreReadonlyClassProperties: クラスのreadonlyプロパティが問題ないと見なされるかどうかを指定する
      // ※ 管理が増えるので対応しない
      '@typescript-eslint/no-magic-numbers': [`off`],
      // 未使用の式を許可しない
      // [recommend: ×, fix: ×, require: ×, relation: eslint/no-unused-expressions]
      // allowShortCircuit: 式で短絡評価を使用できます
      // allowTernary: 式で三項演算子を使用できます
      // allowTaggedTemplates: タグ付きテンプレートリテラルを使用できます
      '@typescript-eslint/no-unused-expressions': [`error`,
        {allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true}],
      // 未使用の変数を許可しない
      // [recommend: ●, fix: ×, require: ×, relation: eslint/no-unused-vars]
      // vars: {all: すべての変数をチェック, local: ローカル変数のみチェック}
      // varsIgnorePattern: チェックしない変数を指定します
      // args: {`after-used`: 最後に使用された引数の後方をチェック, `all`: すべてチェック, `none`: チェックしない}
      // argsIgnorePattern: チェックしない引数を指定します
      // caughtErrors: {`none`: エラー引数をチェックしません, `all`: エラー引数をチェックします}
      // caughtErrorsIgnorePattern: チェックしないエラー引数を指定します
      // ignoreRestSiblings: Restプロパティを使用した場合、残りのプロパティの兄弟は無視されます
      '@typescript-eslint/no-unused-vars': [`error`, {
        vars: `all`, varsIgnorePattern: `^_`, args: `all`, argsIgnorePattern: `^_`,
        caughtErrors: `all`, caughtErrorsIgnorePattern: `^_`, ignoreRestSiblings: false,
      }],
      // 変数を定義する前に使用を許可しない
      // [recommend: ●, fix: ×, require: ×, relation: eslint/no-use-before-define]
      // variables: 変数宣言をチェックする
      // functions: 関数宣言をチェックする
      // classes: クラス宣言をチェックする
      // enums: 上位スコープの列挙型宣言をチェックする
      // typedefs: 型宣言をチェックする
      // ※ 記述の前後で実行タイミングは判断できない
      '@typescript-eslint/no-use-before-define': [`off`],
      // 不要なコンストラクターを許可しない
      // [recommend: ×, fix: ×, require: ×, relation: eslint/no-useless-constructor]
      '@typescript-eslint/no-useless-constructor': [`error`],
      // バッククォート、二重引用符、または単一引用符の一貫した使用を強制する
      // [recommend: ×, fix: ●, require: ×, relation: eslint/quotes]
      // double: 可能な限り二重引用符を使用する必要があります
      // single: 可能な限り単一引用符を使用する必要があります
      // backtick: 可能な限りバッククォートを使用する必要があります
      // avoidEscape: エスケープの為にその引用符が含まれている限り、それ以外の引用符を使用できます
      // allowTemplateLiterals: 文字列でバッククォートを使用できるようにします
      '@typescript-eslint/quotes': [`error`, `backtick`,
        {avoidEscape: false, allowTemplateLiterals: true}],
      // await式のない非同期関数を許可しない
      // [recommend: ●, fix: ×, require: ●, relation: eslint/require-await]
      // ※ 拡張機能が必要
      '@typescript-eslint/require-await': [`off`],
      // 待機中の値を一貫して返すように強制します
      // [recommend: ×, fix: ●, require: ●, relation: eslint/no-return-await]
      // in-try-catch: 返されたpromiseはtry-catch-finallyブロックで待機する必要がある
      // always: 返されたすべてのプロミスを待つ必要があります
      // never: 返されたpromiseをすべて待機します
      // ※ 拡張機能が必要
      '@typescript-eslint/return-await': [`off`],
      // ASIの代わりにセミコロンを要求または禁止する
      // [recommend: ×, fix: ●, require: ×, relation: eslint/semi]
      // always: 文の最後にセミコロンが必要です
      // never: 文の最後にセミコロンを禁止します
      // omitLastInOneLineBlock: ブレースが同じ行にあるブロックの最後のセミコロンを無視します
      // beforeStatementContinuationChars: ※ 動作不安定
      // ⇒ any: 次の行が開始が[`[`, `(`, `/`, `+`, `-`]の場合、セミコロンを無視する
      // ⇒ always: 次の行が開始が[`[`, `(`, `/`, `+`, `-`]の場合、セミコロンを必要とする
      // ⇒ never: 次の行が開始が[`[`, `(`, `/`, `+`, `-`]の場合、セミコロンを禁止する
      '@typescript-eslint/semi': [`error`, `always`, {omitLastInOneLineBlock: false}],
      // 関数の括弧の前に一定の間隔を強制します
      // [recommend: ×, fix: ●, require: ×, relation: eslint/space-before-function-paren]
      // always: 括弧の前にスペースが必要です
      // never: 括弧の前にスペースを許可しない
      // anonymous: 無名関数式 [`always`, `never`, `ignore`]
      // named: 名前付き関数式 [`always`, `never`, `ignore`]
      // asyncArrow: 非同期アロー関数式 [`always`, `never`, `ignore`]
      '@typescript-eslint/space-before-function-paren': [`error`, `never`],

      'vue/script-setup-uses-vars': `error`,
    },
  }],
};
