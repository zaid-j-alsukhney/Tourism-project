(() => {
  const qs=s=>[...document.querySelectorAll(s)], $=id=>document.getElementById(id);
  function activateTab(key,scroll=false){qs('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===key));qs('.tab-panel').forEach(p=>p.classList.toggle('active',p.id===`panel-${key}`));if(scroll)$('lesson')?.scrollIntoView({behavior:'smooth',block:'start'});}
  qs('.tab').forEach(b=>b.addEventListener('click',()=>activateTab(b.dataset.tab)));
  qs('.topic-node').forEach(b=>b.addEventListener('click',()=>activateTab(b.dataset.tab,true)));
  qs('[data-scroll]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.scroll)?.scrollIntoView({behavior:'smooth',block:'start'})));
  document.addEventListener('click',e=>{const b=e.target.closest('.reveal');if(!b)return;const a=b.parentElement.querySelector('.answer');if(!a)return;const show=a.hidden;a.hidden=!show;b.textContent=show?'إخفاء الإجابة':'إظهار الإجابة';});
  const display=$('termDisplay');qs('.term').forEach(btn=>btn.addEventListener('click',()=>{qs('.term').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const [title,desc]=(btn.dataset.term||'|').split('|');display.innerHTML=`<strong>${title}:</strong> ${desc}`;}));
  const answers={q1:'a',q2:'a',q3:'b',q4:'c',q5:'a',q6:'a',q7:'b',q8:'a',q9:'a',q10:'a'};
  $('quiz').addEventListener('submit',e=>{e.preventDefault();let score=0,unanswered=0;Object.entries(answers).forEach(([q,a])=>{const chosen=document.querySelector(`input[name="${q}"]:checked`);const item=document.querySelector(`input[name="${q}"]`)?.closest('.quiz-item');const labels=item?[...item.querySelectorAll('label')]:[];item?.classList.remove('quiz-correct','quiz-wrong','quiz-unanswered');labels.forEach(l=>l.classList.remove('answer-correct','answer-wrong'));item?.querySelector(`input[value="${a}"]`)?.closest('label')?.classList.add('answer-correct');if(!chosen){unanswered++;item?.classList.add('quiz-unanswered');}else if(chosen.value===a){score++;item?.classList.add('quiz-correct');}else{item?.classList.add('quiz-wrong');chosen.closest('label')?.classList.add('answer-wrong');}});$('testScore').textContent=`${score} / 10`;const result=$('quizResult');result.hidden=false;let msg=score===10?'ممتاز! أتقنت درس مقومات السياحة.':score>=8?'ممتاز جدًا. راجع الأسئلة التي أخطأت فيها فقط.':score>=6?'جيد. راجع خريطة الدرس والمصطلحات ثم أعد الاختبار.':'ارجع إلى المحاور والمصطلحات، ثم حاول الاختبار مرة أخرى.';if(unanswered)msg+=` لم تُجب عن ${unanswered} سؤال${unanswered>1?'ات':''}.`;result.innerHTML=`<strong>نتيجتك: ${score}/10</strong><p>${msg}</p>`;result.scrollIntoView({behavior:'smooth',block:'nearest'});});

  $('resetQuiz').addEventListener('click',()=>{
    $('quiz').reset();
    qs('.quiz-item').forEach(item=>{
      item.classList.remove('quiz-correct','quiz-wrong','quiz-unanswered');
      item.querySelectorAll('label').forEach(label=>label.classList.remove('answer-correct','answer-wrong'));
    });
    $('testScore').textContent='— / 10';
    $('quizResult').hidden=true;
  });

  document.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA','BUTTON'].includes(document.activeElement.tagName))return;const keys=['concept','types','market','natural','human','review'];if(e.key>='1'&&e.key<='6')activateTab(keys[Number(e.key)-1]);});
})();
