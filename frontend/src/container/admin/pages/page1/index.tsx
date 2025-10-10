const Page1 = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">📧 Gmail 연동 및 보안 설정 기록</h2>

        <p className="text-gray-700 leading-relaxed">
            Gmail 계정을 백엔드에서 안전하게 사용하기 위해 진행한 <strong>2단계 인증 설정</strong>과{" "}
            <strong>앱 비밀번호 발급 및 SMTP 연동 과정</strong>을 정리한 문서입니다.
            <br />
            Node.js 백엔드에서 Gmail SMTP를 통해 메일을 전송할 때의 설정값과 주의할 점도 함께 포함되어 있습니다.
        </p>

        <h3 className="text-xl font-semibold mt-6">1️⃣ Gmail 계정 보안 설정</h3>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>Google 계정 → <strong>보안</strong> 탭 → <strong>2단계 인증</strong> 활성화</li>
            <li>하단의 <strong>앱 비밀번호(App Password)</strong> 생성 선택</li>
            <li>앱 유형은 “메일”, 기기 유형은 “기타(예: server)”로 지정</li>
            <li>생성된 16자리 비밀번호를 SMTP 비밀번호로 사용</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">2️⃣ 백엔드 환경 변수 설정 (.env)</h3>
        <pre className="bg-gray-100 text-sm p-3 rounded-md mt-2 overflow-x-auto">
            {`GMAIL_USER=yourname@gmail.com
GMAIL_PASS=your_app_password`}
        </pre>

        <h3 className="text-xl font-semibold mt-6">3️⃣ Node.js에서 SMTP 설정 (예: Nodemailer)</h3>
        <pre className="bg-gray-100 text-sm p-3 rounded-md mt-2 overflow-x-auto">
            {`import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {   
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'receiver@example.com',
  subject: 'SMTP 연결 테스트',
  text: 'Gmail SMTP 연동이 성공적으로 작동합니다.',
});`}
        </pre>

        <h3 className="text-xl font-semibold mt-6">4️⃣ 주의할 점 및 팁</h3>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>보안을 위해 일반 비밀번호 대신 반드시 <strong>앱 비밀번호</strong>를 사용</li>
            <li>Google 계정에서 “보안 수준이 낮은 앱 허용”은 더 이상 지원되지 않음</li>
            <li>SMTP 포트: <code>465 (SSL)</code> 또는 <code>587 (TLS)</code></li>
            <li>서버 IP가 Google에 의해 차단되지 않도록 주기적 모니터링 필요</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">💡 정리</h3>
        <p className="text-gray-700 leading-relaxed">
            Gmail은 단순한 메일 서비스가 아니라, <strong>SMTP를 통한 백엔드 자동 메일 발송</strong>에도 매우 유용합니다.
            2단계 인증과 앱 비밀번호를 통한 안전한 접근을 구성하면,
            자체 서비스의 알림 메일이나 인증 메일을 안정적으로 처리할 수 있습니다.
        </p>
    </div>
);

export default Page1;
