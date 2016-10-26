-- =============================================
-- =============================================
CREATE  PROCEDURE [dbo].[ItemGetTotal] 
(
	@filter varchar(max) =''
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    IF(@filter!='')
				SELECT COUNT(*) FROM Item  WHERE Description LIKE ('%'+@filter+'%');
	ELSE
				SELECT COUNT(*) FROM Item 
END
