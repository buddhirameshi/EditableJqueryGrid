-- =============================================
-- =============================================
CREATE PROCEDURE [dbo].[ItemGetData] 
(
	@filter varchar(max) ='',
	@sort varchar(30)='ItemId',
	@isSortDirAsc bit=0
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SET @sort = QUOTENAME(@sort);
	DECLARE @sql NVARCHAR(MAX),
	@sortDir NVARCHAR(5);

	IF(@isSortDirAsc=0)
	SET @sortDir='DESC'
	ELSE
	SET @sortDir='ASC'

  IF(@filter!='')
  SET @sql = N'SELECT TOP 10000 ItemId,Price,Description
               FROM dbo.Item
			   WHERE Description LIKE % '+@filter+'%) 
               ORDER BY ' + @sort +@sortDir+ ';';
ELSE
  SET @sql = N'SELECT TOP 10000 ItemId,Price,Description
               FROM dbo.Item
               ORDER BY '  + @sort +@sortDir+';';


  EXEC sp_executesql @sql;
END
