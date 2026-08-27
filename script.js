// スクロールで要素が画面に入ったらフェードアップ表示する
document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll('.reveal'); // フェードアップ対象の要素

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible'); // 表示状態のクラスを付与
        observer.unobserve(entry.target); // 一度表示したら監視を解除
      }
    });
  }, { threshold: 0.15 }); // 15%見えたら発火

  revealTargets.forEach((target) => observer.observe(target));
});
