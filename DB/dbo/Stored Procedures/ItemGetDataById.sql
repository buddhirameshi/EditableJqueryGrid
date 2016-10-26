-- =============================================
-- =============================================
CREATE PROCEDURE [dbo].[ItemGetDataById] 
	@Id INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    
	SELECT ItemId,Price,Description FROM Item WHERE ItemId=@Id
END
