module.exports = ((req, res, next) => {
  res.status(404).render('views/auth/not404', { title: "khong tim thay trang - 404" , showHeader: false, showFooter: false});
});